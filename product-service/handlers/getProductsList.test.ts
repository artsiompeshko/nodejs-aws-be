import { productsService } from 'lib/services/products';
import { RESPONSE } from 'lib/constants/response';
import { getProductsList } from './getProductsList';

describe('getProductsList.handler', () => {
  test('should return all products', async () => {
    const mockProducts: Product[] = [
      {
        id: '1',
        description: 'test',
        title: 'test',
        imageUrl: 'test.com',
        price: 20,
        count: 2,
      },
    ];

    productsService.findAll = jest.fn().mockReturnValue(mockProducts);

    expect(await getProductsList()).toEqual(RESPONSE._200(mockProducts));
  });

  test('should return internal server error in case of failing extracting products', async () => {
    productsService.findAll = jest.fn(() => {
      throw new Error('');
    });

    expect(await getProductsList()).toEqual(RESPONSE._500({ message: 'Internal Server Error' }));
  });
});
