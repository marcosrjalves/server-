import { Product } from "@src/models/Product";
import { HttpStatuses, lambdaResp } from "adapcon-utils-js";

export async function deleteProduct({
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
  await product.delete();

  return lambdaResp(HttpStatuses.accepted, `Product ${productId} deleted successfully`)
}
