import { yupResolver } from "@hookform/resolvers/yup";
import { createStyles, Grid, makeStyles, Typography } from "@material-ui/core";
import { formatToBRL } from "brazilian-values";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { ButtonTM } from "../../components/ButtonTM";
import { TeacherType } from "../../services/servicesTypes";
import { getTeacherById } from "../../services/teacherService";
import { ContainerPage } from "../../styles";
import { useLogin } from "../../utils/login";
import { HireFormType, hireTeacherSchema } from "./formType";
import HireTeacherDialog from "./hireTeacherDialog";

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
  const { getUserId } = useLogin();
  const [teacher, setTeacher] = useState<TeacherType>();
  const [open, setOpen] = useState<boolean>(false);
  const formHandlers = useForm<HireFormType>({
    resolver: yupResolver(hireTeacherSchema),
  });

  const { reset } = formHandlers;

  const handleClose = () => setOpen(false);

  useEffect(() => {
    async function getTeacherData() {
      const data = await getTeacherById(id);
      setTeacher(data?.[0]);
    }
    getTeacherData();
  }, []);

  useEffect(() => {
    reset({
      valorHora: teacher?.valorHora ? teacher.valorHora : 0,
      professorId: Number(id),
      alunoId: Number(getUserId()),
    });
  }, [teacher, id]);

  return (
    <>
      <HireTeacherDialog
        formHandlers={formHandlers}
        open={open}
        onClose={handleClose}
      />
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
              src="https://t4.ftcdn.net/jpg/03/46/93/61/360_F_346936114_RaxE6OQogebgAWTalE1myseY1Hbb5qPM.jpg"
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
            <ButtonTM width="275px" height="46px" onClick={() => setOpen(true)}>
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
              Nota Média: {teacher?.notaMedia}
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
    </>
  );
}
