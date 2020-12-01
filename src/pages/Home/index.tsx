import React from "react";
import { createStyles, Grid, makeStyles, Theme } from "@material-ui/core";
import TeacherCard from "../../components/TeacherCard";
import "styled-components/macro";
import { ContainerPage } from "../../styles";
import useAxios from "axios-hooks";
import { DisciplinaType, TeacherType } from "../../services/servicesTypes";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, 275px)",
      gridColumnGap: "20px",
      gridRowGap: "40px",
      width: "100%",
      marginTop: "28px",
      justifyItems: "stretch",
      justifyContent: "space-evenly",
    },
  })
);

export default function Home() {
  const classes = useStyles();
  const [{ data: subjects }] = useAxios<DisciplinaType[]>("v1/disciplina");
  const [{ data: teachers }] = useAxios<TeacherType[]>("v1/professor");

  return (
    <ContainerPage>
      <h2>LISTA DE PROFESSORES:</h2>
      <Grid item xs={12} className={classes.grid}>
        {teachers &&
          teachers.map((teacher: any) => (
            <TeacherCard key={teacher.id} teacher={teacher} />
          ))}
      </Grid>
    </ContainerPage>
  );
}
