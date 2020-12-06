import { object, string, number, InferType, array } from "yup";

type autoCompleteSchema = {
  id: string;
  label: string;
};

export const becomeATeacherSchema = object().shape({
  email: string().required("Campo Obrigatório"),
  senha: string().required("Campo Obrigatório"),
  usuarioId: number().required("Campo Obrigatório"),
  disciplinas: object<autoCompleteSchema>().required("Campo Obrigatório"),
  modalidadeEnsinoId: object<autoCompleteSchema>().required("Campo Obrigatório"),
  escolaridaPubAlvoId: object<autoCompleteSchema>().required("Campo Obrigatório"),
  descricao: string().required("Campo Obrigatório"),
  valorHora: number().required("Campo Obrigatório"),
});

export type BecomeATeacherFormType = InferType<typeof becomeATeacherSchema>;
