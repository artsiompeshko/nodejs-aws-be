import { SQSEvent, SQSHandler } from 'aws-lambda';
import { productsService } from 'lib/services/products';

import 'source-map-support/register';

export const catalogBatchProcess = async (event: SQSEvent) => {
  console.info('Executing lambda', event);

  try {
    const { Records: records } = event;

    console.info('Received records', records);

    const createProductDtos: CreateProductDto[] = records.map(record => JSON.parse(record.body));

    console.info('Trying to save products', createProductDtos);

    const products: Product[] = await productsService.create(createProductDtos);

    console.info('Created products', products);
  } catch (e) {
    console.error(e);
  }
};

export const handler: SQSHandler = async (event: SQSEvent): Promise<void> => {
  await catalogBatchProcess(event);
};
