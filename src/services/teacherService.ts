import api from "../config/api";
import { Discipline } from "./disciplineService";
import { Degree } from "./degreeService";
import { TeachTemplate } from "./teachTemplateService";

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
  usuarioId: 0;
  disciplinas: Array<Discipline>;
  modalidadeEnsinoId: string;
  escolaridaPubAlvoId: string;
  descricao: string;
  valorHora: number;
};

export function getTeachers(
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  id?: number,
  nome?: string,
  disciplina?: string
) {
  return api
    .get(`v1/professor?id=${id}&nome=${nome}&disciplina=${disciplina}`)
    .then((res) => res.data as Array<Teacher>)
    .catch((err) => console.log(err))
    .finally(() => setLoading(false));
}

export function becomeATeacher(
  applicationForm: TeacherApplicationForm,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
) {
  api
    .post("v1/professor/aplicarParaProfessor", { ...applicationForm })
    .then((res) => res.data as any)
    .catch((err) => console.log(err))
    .finally(() => setLoading(false));
}
