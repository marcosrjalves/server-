import { Docfy } from 'adapcon-utils-js';

export const docfy: Docfy = {
  type: 'session',
  description: 'Create a new Product',
  pathParameters: {
    productId: {
      label: 'productId',
      description: 'ID of the product',
    }
  }
}
