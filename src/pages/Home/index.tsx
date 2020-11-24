import React from "react";
import {
  createStyles,
  Grid,
  makeStyles,
  Theme,
} from "@material-ui/core";
import TeacherCard from "../../components/TeacherCard";
import "styled-components/macro";
import { ContainerPage } from "../../styles";

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
  return (
    <ContainerPage>
      <h2>LISTA DE PROFESSORES:</h2>
      <Grid item xs={12} className={classes.grid}>
        {Array.from({ length: 12 }).map((e: any) => (
          <TeacherCard />
        ))}
      </Grid>
    </ContainerPage>
  );
}
