import React from "react";

import { Card, CardContent, makeStyles, Typography } from "@material-ui/core";
import CardMedia from "@material-ui/core/CardMedia";
import IconButton from "@material-ui/core/IconButton";
import { createStyles, Theme, useTheme } from "@material-ui/core/styles";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import SkipNextIcon from "@material-ui/icons/SkipNext";
import SkipPreviousIcon from "@material-ui/icons/SkipPrevious";
import { TeacherType } from "../../services/servicesTypes";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      width: 320,
      height: 170,
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
          image="https://scontent.fssa8-1.fna.fbcdn.net/v/t31.0-8/12829000_765396683590910_5081846554797437819_o.jpg?_nc_cat=111&ccb=2&_nc_sid=09cbfe&_nc_eui2=AeExbOx8xempsveFGqwIofSj2OjxaynXuD7Y6PFrKde4PlOcvFt-1UqLTWXGmN16semzvEYuo2QvYDC3gzUtbiJp&_nc_ohc=JvqOKlwEd34AX8Kltkj&_nc_ht=scontent.fssa8-1.fna&oh=b171ca94c031523c97f775e5a6c8003d&oe=5FE9870C"
          title="Live from space album cover"
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
              {teacher.descricao}
            </Typography>
          </CardContent>
        </div>
      </Card>
    </>
  );
}
