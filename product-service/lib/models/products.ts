type Product = {
  id: string;
  description: string;
  price: number;
  title: string;
  imageUrl: string;
  count: number;
};

type CreateProductDto = {
  description: string;
  price: number;
  title: string;
  imageUrl: string;
  count: number;
};
