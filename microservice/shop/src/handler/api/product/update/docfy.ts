import { Docfy } from 'adapcon-utils-js';

export const docfy: Docfy = {
  type: 'session',
  description: 'Create a new Product',
  pathParameters: {
    productId: {
      label: 'productId',
      description: 'ID of the product',
    }
  },
  body: {
    name: {
      label: 'name',
      description: 'Name of the product',
      required: true,
    },
    description: {
      label: 'description',
      description: 'description of the product',
      required: true,
    },
    price: {
      label: 'price',
      description: 'Price of the product',
      required: true,
    },
  },
}
