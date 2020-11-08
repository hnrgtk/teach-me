import api from "../config/api";

export function signIn(email: string, senha: string) {
  api
    .post("v1/auth/login", {
      headers: {
        email: email,
        senha: senha,
      },
    })
    .then((response) => {
      console.log(response.data);
    })
    .catch((err) => console.log(err));
}

type SignUpVariables = {
  nome: string;
  dataNascimento: string;
  email: string;
  senha: string;
  telefone: string;
  escolaridade: string;
  tipoDocumento: string;
  nuDocumento: string;
  uf: string;
  cidade: string;
};

export function signUp(
  variables: SignUpVariables,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
) {
  api
    .post("v1/usuario/cadastrar", {
      ...variables,
    })
    .then((res) => console.log(res))
    .catch((err) => console.log(err))
    .finally(() => setLoading(false));
}
