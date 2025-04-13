import { Product } from "@src/models/Product";

export async function queryProducts({
  name,
  description,
  price,
}: {
  name?: string;
  description?: string;
  price?: number;
}) {
  const products = await Product.query({
    name,
    description,
    price,
  })
  return products
}
