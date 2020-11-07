import { products } from './products';

export async function getAll(): Promise<Product[]> {
  return products;
}

export async function findById(id: number): Promise<Product> {
  const product: Product = products.find(item => item.id === id);

  return product;
}
