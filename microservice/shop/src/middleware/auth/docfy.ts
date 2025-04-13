import { Docfy } from 'adapcon-utils-js';

export const docfy: Docfy = {
  type: 'session',
  description: 'Validates the user session',
  headers: {
    authorization: {
      label: 'Authorization',
      description: 'Bearer token',
      required: true,
    },
  }
}
