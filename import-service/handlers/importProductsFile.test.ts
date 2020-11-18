import createEvent from '@serverless/event-mocks';

import { importService } from 'lib/services/import';
import { RESPONSE } from 'lib/constants/response';

import { importProductsFile } from './importProductsFile';

describe('importProductsFile.handler', () => {
  describe('if filename provided in query string', () => {
    test('should return signed url for file upload', async () => {
      const mockEvent = createEvent('aws:apiGateway', {
        queryStringParameters: {
          name: 'file.csv',
        },
      } as any);

      const mockSignedUrl = 'https://s3-signed-url.com';

      importService.getSignedUrl = jest.fn().mockReturnValue(mockSignedUrl);

      const result = await importProductsFile(mockEvent);

      expect(result).toEqual(RESPONSE._200(mockSignedUrl));
    });
  });

  describe('if filename is not provided in query string', () => {
    test('should return bad request result', async () => {
      const mockEvent = createEvent('aws:apiGateway', {
        queryStringParameters: {
          name: null,
        },
      } as any);

      expect(await importProductsFile(mockEvent)).toEqual(
        RESPONSE._400({ message: 'Bad Request. Please, specify file name' }),
      );
    });
  });
});
