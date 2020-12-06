import { InferType, object, string, number } from "yup";

export const hireTeacherSchema = object().shape({
  professorId: number().required(),
  alunoId: number().required(),
  dataInicioPrestacao: string().required("Campo Obrigatório"),
  horasContratadas: number().required("Campo Obrigatório"),
  valorHora: number().required("Campo Obrigatório"),
});

export type HireFormType = InferType<typeof hireTeacherSchema>;
