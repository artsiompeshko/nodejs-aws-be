import { productsRepository } from 'lib/repositories/products';

export async function findAll(): Promise<Product[]> {
  const products: Product[] = await productsRepository.getAll();

  return products;
}

export async function findById(id: number) {
  const product: Product = await productsRepository.findById(id);

  return product;
}
