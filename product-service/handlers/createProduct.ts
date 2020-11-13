import { APIGatewayProxyHandler, APIGatewayProxyEvent } from 'aws-lambda';
import { RESPONSE } from 'lib/constants/response';
import { productsService } from 'lib/services/products';

import 'source-map-support/register';

export const createProduct = async (event: APIGatewayProxyEvent) => {
  console.info('Executing lambda', event);

  try {
    const createProductDto: CreateProductDto = JSON.parse(event.body);

    console.info('Creating product', createProductDto);
    const product = await productsService.create(createProductDto);

    console.info('Created product', product);

    return RESPONSE._200(product);
  } catch (e) {
    console.error(e);

    return RESPONSE._500({
      message: 'Internal Server Error',
    });
  }
};

export const handler: APIGatewayProxyHandler = async event => {
  return createProduct(event);
};
