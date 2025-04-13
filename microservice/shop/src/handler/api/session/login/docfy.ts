import { Docfy } from 'adapcon-utils-js';

export const docfy: Docfy = {
  type: 'public',
  description: 'Login user with email and password',
  body: {
    email: {
      label: 'email',
      description: 'Email of the user',
      required: true,
    },
    password: {
      label: 'password',
      description: 'Password of the user',
      required: true,
    }
  }
}
