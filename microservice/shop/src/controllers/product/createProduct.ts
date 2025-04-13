import { Product } from "@src/models/Product";

export async function createProduct({
  name,
  description,
  price,
  email,
}: {
  name: string;
  description: string;
  price: number;
  email: string;
}) {
  const product = new Product()
  product.blankProduct({
    name,
    description,
    price,
  });

  await product.create(email);
  return product.show();
}
