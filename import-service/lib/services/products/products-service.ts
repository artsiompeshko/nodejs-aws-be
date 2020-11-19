import AWS from 'aws-sdk';
import { productsRepository } from 'lib/repositories/products';

async function sendNotification(message: string) {
  console.info('Sending message to SNS', message, process.env.SNS_ARN_URL);

  const sns = new AWS.SNS({
    region: 'eu-west-1',
  });

  await sns
    .publish({
      Subject: 'Products import',
      Message: message,
      TopicArn: process.env.SNS_ARN_URL,
    })
    .promise();

  console.info('Sent message to SNS', message, process.env.SNS_ARN_URL);
}

export async function create(createProductDtos: CreateProductDto[]): Promise<Product[]> {
  const products: Product[] = await productsRepository.create(createProductDtos);

  await sendNotification(JSON.stringify(products));

  return products;
}
