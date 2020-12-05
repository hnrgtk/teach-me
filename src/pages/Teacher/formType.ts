import { boolean, InferType, object, string, number } from "yup";

export const hireTeacherSchema = object().shape({
  dataContrato: string().required("Campo Obrigatório"),
  dataInicioPrestacao: string().required("Campo Obrigatório"),
  dataFimPrestacao: string().required("Campo Obrigatório"),
  horasContratadas: string().required("Campo Obrigatório"),
  valorHora: number().required("Campo Obrigatório"),
  avaliado: boolean().required("Campo Obrigatório"),
});

export type HireFormType = InferType<typeof hireTeacherSchema>;
