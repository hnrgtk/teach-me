import React from "react";
import { Card, CardContent, makeStyles, Typography } from "@material-ui/core";
import CardMedia from "@material-ui/core/CardMedia";
import { createStyles, Theme } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import { TeacherType } from "../../services/servicesTypes";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      width: 420,
      height: 180,
      cursor: "pointer",
    },
    details: {
      display: "flex",
      flexDirection: "column",
    },
    content: {
      flex: "1 0 auto",
    },
    cover: {
      width: 120,
    },
  })
);
type Props = {
  teacher: TeacherType;
};

export default function TeacherCard({ teacher }: Props) {
  const classes = useStyles();
  const { push } = useHistory();
  return (
    <>
      <Card
        className={classes.root}
        onClick={() => push(`/professor/${teacher.id}`)}
      >
        <CardMedia
          className={classes.cover}
          image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLuox6vatPBS6w8edvrLbqXzHimyKXOVejMQ&usqp=CAU"
        />
        <div className={classes.details}>
          <CardContent className={classes.content}>
            <Typography component="h5" variant="h5">
              {teacher.usuario.nome}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              {teacher.disciplinas[0].descricao}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              Nota: {teacher.notaMedia}
            </Typography>
            <Typography variant="subtitle2" color="textSecondary">
              {teacher.descricao}
            </Typography>
          </CardContent>
        </div>
      </Card>
    </>
  );
}
