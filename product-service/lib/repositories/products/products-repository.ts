import { db } from 'lib/db';

export async function getAll(): Promise<Product[]> {
  const client = db.getClient();

  try {
    await client.connect();

    const { rows } = await client.query<Product>(`
      SELECT p.id, p.title, p.description, p.price, p.imageUrl, s.count from products p
        LEFT JOIN stocks s
        on p.id = s.product_id;
    `);

    return rows;
  } finally {
    await client.end();
  }
}

export async function findById(id: string): Promise<Product> {
  const client = db.getClient();

  try {
    await client.connect();

    const { rows } = await client.query<Product>(`
      SELECT p.id, p.title, p.description, p.price, p.imageUrl, s.count from products p
        LEFT JOIN stocks s
        on p.id = s.product_id
        WHERE p.id = '${id}';
    `);

    return rows[0];
  } finally {
    await client.end();
  }
}

export async function create(createProductDto: CreateProductDto): Promise<Product> {
  const client = db.getClient();

  try {
    await client.connect();

    await client.query('BEGIN');

    const { rows: productRows } = await client.query<Product>(
      `
        INSERT INTO products(title, description, price, imageUrl)
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

    await client.query('COMMIT');

    return {
      ...createdProduct,
      count: createdStock.count,
    };
  } catch (e) {
    await client.query('ROLLBACK');

    throw e;
  } finally {
    await client.end();
  }
}
