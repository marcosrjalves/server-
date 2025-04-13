import { Docfy } from 'adapcon-utils-js';

export const docfy: Docfy = {
  type: 'public',
  description: 'Create a new User',
  body: {
    email: {
      label: 'email',
      description: 'Email of the user',
      required: true,
    },
    name: {
      label: 'name',
      description: 'Name of the user',
      required: true,
    },
    password: {
      label: 'password',
      description: 'Password of the user',
      required: true,
    }
  }
}
