import api from "../config/api";

export type Degree = {
  id: string;
  descricao: string;
}

export function getDegree(
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
) {
  api.get('v1/escolaridade')
    .then((res) => res.data as Array<Degree>)
    .catch((err) => console.log(err))
    .finally(() => setLoading(false));
}

export function getDegreeById(
  id: string,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
) {
  api.get(`v1/escolaridade/porId?Id=${id}`)
    .then((res) => res.data as Degree)
    .catch((err) => console.log(err))
    .finally(() => setLoading(false));
}
