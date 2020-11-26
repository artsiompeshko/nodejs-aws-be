/* eslint-disable no-restricted-syntax */
import AWS from 'aws-sdk';
import csvParser from 'csv-parser';

const BUCKET = 'arsiompeshkonodejsinaws2-product-import';

export function getSignedUrl(fileName: string): string {
  const s3 = new AWS.S3({ region: 'eu-west-1' });

  const params = {
    Bucket: BUCKET,
    Key: `uploaded/${fileName}`,
    Expires: 60,
    ContentType: 'text/csv',
  };
  const url = s3.getSignedUrl('putObject', params);

  return url;
}

async function parseRecord(record: any): Promise<void> {
  const s3 = new AWS.S3({ region: 'eu-west-1' });
  const sqs = new AWS.SQS({ region: 'eu-west-1' });

  return new Promise((resolve, reject) => {
    const recordKey = record.s3.object.key;
    const parsedRecordKey = recordKey.replace('uploaded', 'parsed');

    const s3Stream = s3
      .getObject({
        Bucket: BUCKET,
        Key: recordKey,
      })
      .createReadStream();

    s3Stream
      .pipe(csvParser())
      .on('data', async data => {
        console.info(data);

        try {
          console.info('Sending to SQS', process.env.SQS_URL);
          await sqs
            .sendMessage({
              MessageBody: JSON.stringify(data),
              QueueUrl: process.env.SQS_URL,
            })
            .promise();

          console.info('Successfully sent to SQS', process.env.SQS_URL);
        } catch (err) {
          console.error('Error while sending to SQS', process.env.SQS_URL);
        }
      })
      .on('error', e => {
        console.error(e);

        reject(e);
      })
      .on('end', async function () {
        try {
          console.info(`Parsed ${recordKey}`);
          console.info(`Copying ${recordKey} to ${parsedRecordKey}`);

          await s3
            .copyObject({
              Bucket: BUCKET,
              CopySource: `${BUCKET}/${recordKey}`,
              Key: parsedRecordKey,
            })
            .promise();

          console.info(`Copied ${recordKey} to ${parsedRecordKey}`);

          console.info(`Deleting ${recordKey}`);

          await s3
            .deleteObject({
              Bucket: BUCKET,
              Key: recordKey,
            })
            .promise();

          console.info(`Deleted ${recordKey}`);

          resolve();
        } catch (e) {
          console.error(e);

          reject(e);
        }
      });
  });
}

export async function parseRecords(records: Array<any>): Promise<void> {
  const promises = records.map(record => parseRecord(record));

  await Promise.all(promises);
}
