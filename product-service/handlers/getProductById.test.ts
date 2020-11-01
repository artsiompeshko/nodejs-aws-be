import createEvent from '@serverless/event-mocks';

import { productsService } from 'lib/services/products';
import { RESPONSE } from 'lib/constants/response';
import { getProductById } from './getProductById';

describe('getProductById.handler', () => {
  describe('if id provided in path', () => {
    test('should return product by its id', async () => {
      const mockEvent = createEvent('aws:apiGateway', {
        pathParameters: {
          id: '1',
        },
      } as any);

      const mockProduct: Product = {
        id: 1,
        description: 'test',
        title: 'test',
        imageUrl: 'test.com',
        price: 20,
      };

      productsService.findById = jest.fn().mockReturnValue(mockProduct);

      const result = await getProductById(mockEvent);

      expect(result).toEqual(RESPONSE._200(mockProduct));
    });
  });

  describe('if id is not provided in path', () => {
    test('should return bad request result', async () => {
      const mockEvent = createEvent('aws:apiGateway', {
        pathParameters: {},
      } as any);

      expect(await getProductById(mockEvent)).toEqual(RESPONSE._400({ message: 'Please, provide id' }));
    });
  });
});
