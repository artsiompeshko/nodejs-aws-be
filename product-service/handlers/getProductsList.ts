import { APIGatewayProxyHandler } from 'aws-lambda';
import { RESPONSE } from 'lib/constants/response';
import { productsService } from 'lib/services/products';

import 'source-map-support/register';

export const getProductsList = async () => {
  console.info('Executing lambda');

  try {
    console.info('Looking for all products');
    const products: Product[] = await productsService.findAll();

    console.info('Found products', products);

    return RESPONSE._200(products);
  } catch (e) {
    console.error('Error while executing lambda', e);

    return RESPONSE._500({ message: 'Internal Server Error' });
  }
};

export const handler: APIGatewayProxyHandler = async () => {
  return getProductsList();
};
