import api from "../config/api";
import { Discipline } from "./disciplineService";
import { Degree } from "./degreeService";
import { TeachTemplate } from "./teachTemplateService";
import { HireFormType } from "../pages/Teacher/formType";

export type Teacher = {
  id: number;
  descricao: string;
  valorHora: number;
  usuario: {
    id: number;
    nome: string;
    dataNascimento: Date;
    email: string;
    telefone: string;
    escolaridade: Degree;
    uf: string;
    cidade: string;
    token: string;
  };
  modalidadeEnsino: TeachTemplate;
  escolaridaPubAlvo: Degree;
  disciplinas: Array<Discipline>;
  notaMedia: number;
  qtdAvaliacoes: number;
};

export type TeacherApplicationForm = {
  email: string;
  senha: string;
  usuarioId: number;
  disciplinas: Array<Discipline>;
  modalidadeEnsinoId: string;
  escolaridaPubAlvoId: string;
  descricao: string;
  valorHora: number;
};

export function getTeachers() {
  return api
    .get(`v1/professor`)
    .then((res) => res?.data)
    .catch((err) => console.log(err));
}

export function searchTeachers(nome?: string, disciplina?: string) {
  return api
    .get(`v1/professor?nome=${nome ?? ""}&disciplina=${disciplina ?? ""}`)
    .then((res) => res.data)
    .catch((err) => console.log(err));
}

export function getTeacherById(id: string) {
  return api
    .get(`v1/professor?id=${id}`)
    .then((res) => res?.data)
    .catch((err) => console.log(err));
}

export function becomeATeacher(applicationForm: TeacherApplicationForm) {
  return api
    .post("v1/professor/aplicarParaProfessor", { ...applicationForm })
    .then((res) => res.statusText as any)
    .catch((err) => console.log(err));
}

export function hireTeacher(input: HireFormType) {
  return api
    .post(`v1/aula/contratarAula`, { ...input })
    .then((res) => res?.statusText)
    .catch((err) => console.log(err));
}
