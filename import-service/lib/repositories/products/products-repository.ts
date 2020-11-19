import { db } from 'lib/db';

export async function create(createProductDtos: CreateProductDto[]): Promise<Product[]> {
  const client = db.getClient();

  try {
    await client.connect();

    await client.query('BEGIN');

    const products: Product[] = await Promise.all(
      createProductDtos.map(async createProductDto => {
        const { rows: productRows } = await client.query<Product>(
          `
        INSERT INTO products(title, description, price, image_url)
          VALUES ($1, $2, $3, $4)
          RETURNING *
      `,
          [createProductDto.title, createProductDto.description, createProductDto.price, createProductDto.imageUrl],
        );

        const createdProduct: Product = productRows[0];

        const { rows: stockRows } = await client.query<Stock>(
          `
        INSERT INTO stocks(product_id, count)
          VALUES ($1, $2)
          RETURNING *
      `,
          [createdProduct.id, createProductDto.count],
        );

        const createdStock: Stock = stockRows[0];

        return {
          ...createdProduct,
          count: createdStock.count,
        };
      }),
    );

    await client.query('COMMIT');

    return products;
  } catch (e) {
    await client.query('ROLLBACK');

    throw e;
  } finally {
    await client.end();
  }
}
