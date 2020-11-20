import { object, string, InferType } from "yup";

type autoCompleteSchema = {
  id: string;
  label: string;
};

export const signUpSchema = object({
  nome: string().required("Campo Obrigatório"),
  dataNascimento: string().required("Campo Obrigatório"),
  email: string().email("Digite um email válido").required("Campo Obrigatório"),
  senha: string().required("Campo Obrigatório"),
  telefone: string().required("Campo Obrigatório"),
  escolaridade: object<autoCompleteSchema>().required("Campo Obrigatório"),
  tipoDocumento: object<autoCompleteSchema>().required("Campo Obrigatório"),
  nuDocumento: string().required("Campo Obrigatório"),
  uf: string().required("Campo Obrigatório"),
  cidade: string().required("Campo Obrigatório"),
});
export type SignUpFormType = InferType<typeof signUpSchema>;

export const loginSchema = object({
  email: string().email("Digite um email válido").required("Campo Obrigatório"),
  senha: string().required("Campo Obrigatório"),
});

export type LoginFormType = InferType<typeof loginSchema>;
