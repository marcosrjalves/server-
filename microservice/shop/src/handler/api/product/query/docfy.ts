import { Docfy } from 'adapcon-utils-js';

export const docfy: Docfy = {
  type: 'session',
  description: 'Create a new Product',
  queryStringParameters: {
    name: {
      label: 'name',
      description: 'Name of the product',
    },
    description: {
      label: 'description',
      description: 'description of the product',
    },
    price: {
      label: 'price',
      description: 'Price of the product',
    },
  }
}
