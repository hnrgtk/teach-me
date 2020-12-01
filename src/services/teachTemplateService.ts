import api from "../config/api";

export type TeachTemplate = {
  id: string;
  descricao: string;
}

export function getTeachTemplates(
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
) {
  api.get('v1/modalidadeEnsino')
    .then((res) => res.data as Array<TeachTemplate>)
    .catch((err) => console.log(err))
    .finally(() => setLoading(false));
}

export function getTeachTemplateById(
  id: string,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
) {
  api.get(`v1/modalidadeEnsino/porId?Id=${id}`)
    .then((res) => res.data as TeachTemplate)
    .catch((err) => console.log(err))
    .finally(() => setLoading(false));
}
