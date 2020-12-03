import { Typography } from "@material-ui/core";
import useAxios from "axios-hooks";
import React, { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { ButtonTM } from "../../components/ButtonTM";
import { TeacherType } from "../../services/servicesTypes";
import { ContainerPage } from "../../styles";
import { formatToBRL } from "brazilian-values";

export default function TeacherDetail() {
  const { id } = useParams<{ id: string }>();
  const [{ data }] = useAxios<TeacherType[]>(`v1/professor?id=${id}`);
  const [teacher, setTeacher] = useState<TeacherType>();

  useEffect(() => {
    setTeacher(data?.[0]);
  }, [data]);
  return (
    <div style={{ display: "flex" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
          width: "400px",
          height: "93vh",
          backgroundColor: "#f7f8f1",
        }}
      >
        <div>
          <img
            src="https://scontent.fssa8-1.fna.fbcdn.net/v/t31.0-8/12829000_765396683590910_5081846554797437819_o.jpg?_nc_cat=111&ccb=2&_nc_sid=09cbfe&_nc_eui2=AeExbOx8xempsveFGqwIofSj2OjxaynXuD7Y6PFrKde4PlOcvFt-1UqLTWXGmN16semzvEYuo2QvYDC3gzUtbiJp&_nc_ohc=JvqOKlwEd34AX8Kltkj&_nc_ht=scontent.fssa8-1.fna&oh=b171ca94c031523c97f775e5a6c8003d&oe=5FE9870C"
            style={{
              verticalAlign: "middle",
              width: "250px",
              height: "250px",
              borderRadius: "50%",
              margin: "20px 0px",
            }}
          />
          <Typography variant="h4" align="center">
            {teacher?.usuario.nome}
          </Typography>
        </div>
        <div style={{ alignItems: "flex-end", marginBottom: "20px" }}>
          <ButtonTM
            width="275px"
            height="46px"
            onClick={() => console.log("a")}
          >
            <Typography variant="h6">Contratar</Typography>
          </ButtonTM>
        </div>
      </div>
      <ContainerPage>
        <Typography variant="h5" style={{ fontWeight: "bold" }}>
          Valor Hora: {formatToBRL(String(teacher?.valorHora))}
        </Typography>
      </ContainerPage>
    </div>
  );
}
