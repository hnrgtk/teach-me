import api from "../config/api";

export type Discipline = {
  id: string;
  descricao: string;
  ativo: boolean;
}

export function getDisciplines(
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
) {
  api.get('v1/disciplina')
    .then((res) => res.data as Array<Discipline>)
    .catch((err) => console.log(err))
    .finally(() => setLoading(false));
}

export function getDisciplineById(
  id: string,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
) {
  api.get(`v1/disciplina/porId?Id=${id}`)
    .then((res) => res.data as Discipline)
    .catch((err) => console.log(err))
    .finally(() => setLoading(false));
}
