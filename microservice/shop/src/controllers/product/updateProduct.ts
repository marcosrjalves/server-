import { Product } from "@src/models/Product";

export async function updateProduct({
  productId,
  name,
  description,
  price,
  email,
}: {
  productId: string;
  name?: string;
  description?: string;
  price?: number;
  email: string;
}) {
  const product = new Product();
  product.fromDB({
    PK: 'PRODUCT',
    SK: productId
  });

  await product.get();

  product.update({
    name,
    description,
    price,
    email
  })

  return product.show();
}
