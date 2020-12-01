export type SignUpVariables = {
  nome: string;
  dataNascimento: string;
  email: string;
  senha: string;
  telefone: string;
  escolaridadeId: string;
  tipoDocumento: string;
  nuDocumento: string;
  uf: string;
  cidade: string;
};

export type UserType = {
  id: number;
  nome: string;
  dataNascimento: string;
  email: string;
  senha: string;
  telefone: string;
  escolaridade: Record<"descricao" | "id", string>;
  tipoDocumento: string;
  nuDocumento: string;
  uf: string;
  cidade: string;
};

export type DisciplinaType = {
  id: string;
  descricao: string;
  ativo: boolean;
};

export type TeacherType = {
  id: number;
  descricao: string;
  notaMedia: number;
  qtdAvaliacoes: number;
  valorHora: number;
  disciplinas: DisciplinaType[];
  escolaridaPubAlvo: Record<"descricao" | "id", string>;
  modalidadeEnsino: Record<"descricao" | "id", string>;
  usuario: UserType;
};
