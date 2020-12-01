import api from "../config/api";
import { LoginFormType } from "../pages/Login/formType";
import { SignUpVariables } from "./servicesTypes";

export async function signIn(values: LoginFormType, history: any) {
  api
    .get("v1/auth/login", {
      headers: {
        email: values.email,
        senha: values.senha,
      },
    })
    .then((res) => {
      localStorage.setItem("loginToken", String(res?.data.token));
      history.push("/home");
    })
    .catch((err) => console.log(err));
}

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

export function auth(
  id: string,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
) {
  api
    .get(`v1/usuario/validarCadastro?cadastro=${id}`)
    .then((res) => console.log(res))
    .catch((err) => console.log(err))
    .finally(() => setLoading(false));
}
