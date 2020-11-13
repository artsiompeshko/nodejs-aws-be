import AWS from 'aws-sdk';

export function getSignedUrl(fileName: string): string {
  const s3 = new AWS.S3({ region: 'eu-west-1' });

  const params = {
    Bucket: 'arsiompeshkonodejsinaws2-product-import',
    Key: `uploaded/${fileName}`,
    Expires: 60,
    ContentType: 'text/csv',
  };
  const url = s3.getSignedUrl('putObject', params);

  return url;
}
