import React, { useEffect, useState } from "react";
import { createStyles, Grid, makeStyles, Typography } from "@material-ui/core";
import { formatToBRL } from "brazilian-values";
import { useParams } from "react-router-dom";
import { ButtonTM } from "../../components/ButtonTM";
import { TeacherType } from "../../services/servicesTypes";
import { getTeacherById } from "../../services/teacherService";
import { ContainerPage } from "../../styles";

const useStyles = makeStyles(() =>
  createStyles({
    typographyTitle: {
      fontWeight: "bold",
      marginBottom: 16,
    },
    typography: {
      fontWeight: 500,
      marginBottom: 8,
    },
  })
);

export default function TeacherDetail() {
  const classes = useStyles();
  const { id } = useParams<{ id: string }>();
  const [teacher, setTeacher] = useState<TeacherType>();

  useEffect(() => {
    async function getTeacherData() {
      const data = await getTeacherById(id);
      setTeacher(data?.[0]);
    }
    getTeacherData();
  }, []);

  console.log(teacher);
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

      <ContainerPage style={{ marginLeft: 30, marginTop: 30 }}>
        <Grid
          container
          item
          xs={12}
          direction="column"
          style={{ height: "50%" }}
        >
          <Typography className={classes.typographyTitle} variant="h4">
            Dados da Aula:
          </Typography>
          <Typography className={classes.typography} variant="h5">
            Modalidade de Ensino: {teacher?.modalidadeEnsino.descricao}
          </Typography>
          <Typography className={classes.typography} variant="h5">
            Disciplinas:{" "}
            {teacher?.disciplinas.map((d: any) => d.descricao).join(", ")}
          </Typography>
          <Typography className={classes.typography} variant="h5">
            Público Alvo: {teacher?.escolaridaPubAlvo.descricao}
          </Typography>

          <Typography variant="h5" className={classes.typography}>
            Valor Hora: {formatToBRL(String(teacher?.valorHora))}
          </Typography>
        </Grid>

        <Grid
          item
          container
          xs={12}
          direction="column"
          style={{ height: "50%" }}
        >
          <Typography className={classes.typographyTitle} variant="h4">
            Dados do Professor:
          </Typography>
          <Typography className={classes.typography} variant="h5">
            Descrição: {teacher?.descricao}
          </Typography>
          <Typography className={classes.typography} variant="h5">
            Escolaridade: {teacher?.usuario.escolaridade.descricao}
          </Typography>
          <Typography className={classes.typography} variant="h5">
            Email: {teacher?.usuario.email}
          </Typography>
          <Typography className={classes.typography} variant="h5">
            Telefone: {teacher?.usuario.telefone}
          </Typography>
        </Grid>
      </ContainerPage>
    </div>
  );
}
