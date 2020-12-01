import useAxios from "axios-hooks";
import React from "react";
import { useParams } from "react-router-dom";
import { TeacherType } from "../../services/servicesTypes";
import { ContainerPage } from "../../styles";

export default function TeacherDetail() {
  const { id } = useParams<{ id: string }>();

  const [{ data }] = useAxios<TeacherType[]>(`v1/professor?id=${id}`);

  return (
    <ContainerPage>
      <h2>{data && data[0].usuario.nome}</h2>
    </ContainerPage>
  );
}
