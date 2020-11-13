import { S3Handler, S3Event } from 'aws-lambda';

import { importService } from 'lib/services';

import 'source-map-support/register';

export const importFileParser = async (event: S3Event) => {
  console.info('Executing lambda', event);

  try {
    const { Records: records } = event;

    console.info('Trying to parse the records', records);
    await importService.parseRecords(records);
  } catch (e) {
    console.error(e);
  }
};

export const handler: S3Handler = async (event: S3Event): Promise<void> => {
  await importFileParser(event);
};
