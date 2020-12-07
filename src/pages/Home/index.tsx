import { Grid } from "@material-ui/core";
import useAxios from "axios-hooks";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import "styled-components/macro";
import { ButtonTM } from "../../components/ButtonTM";
import { InputCTL } from "../../components/InputTM/inputCTL";
import { AutoCompleteCTL } from "../../components/SelectTM/AutoCompleteCTL";
import TeacherCard from "../../components/TeacherCard";
import { TeacherType } from "../../services/servicesTypes";
import { getTeachers, searchTeachers } from "../../services/teacherService";
import { ContainerPage } from "../../styles";
import { useStyles } from "./styles";

type SearchType = {
  nome: string;
  disciplina: {
    id: string;
    label: string;
  };
};

export default function Home() {
  const classes = useStyles();
  const { control, getValues, handleSubmit } = useForm<SearchType>();
  const [teachers, setTeachers] = useState<TeacherType[]>();
  const [{ data: disciplines }] = useAxios("/v1/disciplina");

  useEffect(() => {
    async function getAllTeachers() {
      const data = await getTeachers();
      setTeachers(data);
    }
    getAllTeachers();
  }, []);

  async function filterSubmit() {
    const nome = getValues("nome");
    const disciplina = getValues("disciplina");
    const data = await searchTeachers(nome, disciplina?.label);
    setTeachers(data);
  }

  return (
    <ContainerPage>
      <h2>FILTROS:</h2>
      <Grid
        container
        item
        xs={12}
        justify="flex-start"
        spacing={2}
        style={{ marginBottom: 36 }}
      >
        <Grid item xs={3}>
          <InputCTL
            label="Filtrar por Professor"
            control={control}
            name="nome"
            style={{ width: "100%" }}
          />
        </Grid>
        <Grid item xs={3}>
          <AutoCompleteCTL
            label="Filtrar por Disciplina"
            options={
              disciplines?.map((d: any) => ({
                id: d.id,
                label: d.descricao,
              })) ?? []
            }
            style={{
              width: "100%",
            }}
            {...{ control, name: "disciplina" }}
          />
        </Grid>
        <Grid
          item
          xs={3}
          container
          alignItems="center"
          style={{ marginTop: 8 }}
        >
          <ButtonTM
            width="50%"
            height="40px"
            onClick={handleSubmit(filterSubmit)}
          >
            Filtrar
          </ButtonTM>
        </Grid>
      </Grid>
      <h2>LISTA DE PROFESSORES:</h2>
      <Grid item xs={12} className={classes.grid}>
        {teachers &&
          teachers.map((teacher: any) => (
            <React.Fragment key={teacher.id}>
              <TeacherCard teacher={teacher} />
            </React.Fragment>
          ))}
      </Grid>
    </ContainerPage>
  );
}
