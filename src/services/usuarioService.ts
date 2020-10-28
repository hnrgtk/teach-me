import api from '../config/api';

export function fazerLogin(email: string, senha: string) {
  api.get('v1/auth/login', {
    headers: {
      'email': email,
      'senha': senha
    }
  }).then(response => {
    console.log(response.data);
  })
}