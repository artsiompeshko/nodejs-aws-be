import { productsRepository } from 'lib/repositories/products';

export async function findAll(): Promise<Product[]> {
  const products: Product[] = await productsRepository.getAll();

  return products;
}

export async function findById(id: string): Promise<Product> {
  const product: Product = await productsRepository.findById(id);

  return product;
}

export async function create(createProductDto: CreateProductDto): Promise<Product> {
  const product: Product = await productsRepository.create(createProductDto);

  return product;
}
