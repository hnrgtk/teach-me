import {
  createStyles,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";
import moment from "moment";
import React from "react";
import { ButtonTM } from "../../components/ButtonTM";
import { MaskedInputCTL } from "../../components/InputTM/maskedInput";

type Props = {
  formHandlers: any;
  open: boolean;
  onClose: () => void;
};

const useStyles = makeStyles(() =>
  createStyles({
    title: {
      paddingBottom: 0,
    },
    button: {
      marginTop: 6,
    },
    dialog: {
      display: "flex",
      justifyContent: "center",
    },
  })
);

export default function HireTeacherDialog({
  formHandlers,
  open,
  onClose,
}: Props) {
  const classes = useStyles();
  const { control } = formHandlers;
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle className={classes.title}>
        Formulário de Contratação
      </DialogTitle>
      <DialogContent className={classes.dialog}>
        <Grid container item xs={12} spacing={2}>
          <Grid item xs={6}>
            <MaskedInputCTL
              label="Data do Contrato"
              format="##/##/####"
              mask="_"
              {...{ control, name: "dataContrato" }}
            />
          </Grid>
          <Grid item xs={6}>
            <MaskedInputCTL
              label="Valor Hora"
              format="##"
              mask="_"
              {...{ control, name: "valorHora" }}
            />
          </Grid>
          <Grid item xs={6}>
            <MaskedInputCTL
              label="Data Início"
              format="##/##/####"
              mask="_"
              {...{ control, name: "dataInicioPrestacao" }}
            />
          </Grid>
          <Grid item xs={6}>
            <MaskedInputCTL
              label="Data Final"
              format="##/##/####"
              mask="_"
              {...{ control, name: "dataFimPrestacao" }}
            />
          </Grid>
          <Grid item xs={6}>
            <MaskedInputCTL
              label="Horas Contratadas"
              format="##"
              mask="_"
              {...{ control, name: "horasContratadas" }}
            />
          </Grid>
          <Grid
            item
            xs={6}
            container
            direction="row"
            justify="center"
            alignContent="center"
          >
            <ButtonTM width="100%" height="40px" className={classes.button}>
              Contratar
            </ButtonTM>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
}
