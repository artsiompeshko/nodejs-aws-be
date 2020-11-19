import createEvent from '@serverless/event-mocks';

import { productsService } from 'lib/services/products';

import { catalogBatchProcess } from './catalogBatchProcess';

describe('catalogBatchProcess.handler', () => {
  describe('if filename provided in query string', () => {
    test('should return signed url for file upload', async () => {
      const mockRecords = [
        {
          body: JSON.stringify({
            title: 'test',
            description: 'test',
            count: 1,
            price: '60',
            imageUrl: 'www.test.com',
          }),
        },
      ];

      const mockEvent = createEvent('aws:sqs', {
        Records: mockRecords,
      } as any);

      const mockCreatedProducts = [
        {
          id: 1,
          title: 'test',
          description: 'test',
          count: 1,
          price: '60',
          imageUrl: 'www.test.com',
        },
      ];

      productsService.create = jest.fn().mockReturnValue(mockCreatedProducts);

      await catalogBatchProcess(mockEvent);

      expect(productsService.create).toHaveBeenCalledWith(mockRecords.map(({ body }) => JSON.parse(body)));
    });
  });
});
