import { APIGatewayProxyHandler } from 'aws-lambda';
import { RESPONSE } from 'lib/constants/response';
import { productsService } from 'lib/services/products';
import 'source-map-support/register';

export const handler: APIGatewayProxyHandler = async (event, _context) => {
  try {
    const products: Product[] = await productsService.findAll();

    return RESPONSE._200(products);
  } catch (e) {
    console.error('Error while executing lambda', e);

    return RESPONSE._500({ message: 'Internal Server Error' });
  }
};
