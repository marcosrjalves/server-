import { Product } from "@src/models/Product";

export async function getProduct({
  productId,
}: {
  productId: string;
}) {
  const product = new Product();
  product.fromDB({
    PK: 'PRODUCT',
    SK: productId
  });

  await product.get();
  return product.show();
}
