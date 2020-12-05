import React from "react";
import { createStyles, Grid, makeStyles } from "@material-ui/core";
import useAxios from "axios-hooks";
import "styled-components/macro";
import TeacherCard from "../../components/TeacherCard";
import { DisciplinaType, TeacherType } from "../../services/servicesTypes";
import { ContainerPage } from "../../styles";

const useStyles = makeStyles(() =>
  createStyles({
    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, 420px)",
      gridColumnGap: "14px",
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
            <>
              <TeacherCard key={teacher.id} teacher={teacher} />
              <TeacherCard key={teacher.id} teacher={teacher} />
              <TeacherCard key={teacher.id} teacher={teacher} />
              <TeacherCard key={teacher.id} teacher={teacher} />
              <TeacherCard key={teacher.id} teacher={teacher} />
              <TeacherCard key={teacher.id} teacher={teacher} />
              <TeacherCard key={teacher.id} teacher={teacher} />
              <TeacherCard key={teacher.id} teacher={teacher} />
              <TeacherCard key={teacher.id} teacher={teacher} />
              <TeacherCard key={teacher.id} teacher={teacher} />
            </>
          ))}
      </Grid>
    </ContainerPage>
  );
}
