import { APIGatewayProxyHandler, APIGatewayProxyEvent } from 'aws-lambda';
import { RESPONSE } from 'lib/constants/response';
import { productsService } from 'lib/services/products';

import 'source-map-support/register';

export const getProductById = async (event: APIGatewayProxyEvent) => {
  console.info('Executing lambda', event);

  try {
    const { id } = event?.pathParameters || {};

    if (!id) {
      return RESPONSE._400({
        message: 'Please, provide id',
      });
    }

    console.info('Looking for product by id', id);
    const product: Product = await productsService.findById(id);

    console.info('Found product', product);

    if (product) {
      return RESPONSE._200(product);
    }

    return {
      statusCode: 204,
      body: JSON.stringify(null),
    };
  } catch (e) {
    console.error('Error while executing lambda', e);

    return RESPONSE._500({
      message: 'Internal Server Error',
    });
  }
};

export const handler: APIGatewayProxyHandler = async event => {
  return getProductById(event);
};
