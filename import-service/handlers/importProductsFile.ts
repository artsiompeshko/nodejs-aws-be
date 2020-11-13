import { APIGatewayProxyHandler, APIGatewayProxyEvent } from 'aws-lambda';
import { RESPONSE } from 'lib/constants/response';

import { importService } from 'lib/services/import';

import 'source-map-support/register';

export const importProductsFile = async (event: APIGatewayProxyEvent) => {
  console.info('Executing lambda', event);

  try {
    const { name } = event.queryStringParameters;

    if (!name) {
      console.warn('Name is not specified in query params');

      return RESPONSE._400({
        message: 'Bad Request. Please, specify file name',
      });
    }

    console.info(`Trying to get signed url for ${name}`);
    const signedUrl = importService.getSignedUrl(name);

    console.info('Got signed url, returning result to the client');
    return RESPONSE._200(signedUrl);
  } catch (e) {
    console.error(e);

    return RESPONSE._500({
      message: 'Internal Server Error',
    });
  }
};

export const handler: APIGatewayProxyHandler = async event => {
  return importProductsFile(event);
};
