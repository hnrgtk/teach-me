import {
  createStyles,
  Dialog,
  DialogContent,
  Grid,
  makeStyles,
} from "@material-ui/core";
import moment from "moment";
import React, { useState } from "react";
import { ButtonTM } from "../../components/ButtonTM";
import { InputCTL } from "../../components/InputTM/inputCTL";
import { MaskedInputCTL } from "../../components/InputTM/maskedInput";
import { hireTeacher } from "../../services/teacherService";
import { HireFormType } from "./formType";
import { DialogTitle } from "./styles";

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
    dialog: {
      display: "flex",
      justifyContent: "center",
    },
    input: {
      width: "100%",
    },
  })
);

export default function HireTeacherDialog({
  formHandlers,
  open,
  onClose,
}: Props) {
  const classes = useStyles();
  const { control, errors, handleSubmit } = formHandlers;
  const [status, setStatus] = useState<Record<string, string | string>>();

  async function onSubmit(values: HireFormType) {
    const input = {
      ...values,
      dataInicioPrestacao: moment(
        values.dataInicioPrestacao,
        "DD/MM/YYYY"
      ).toISOString(),
    };

    const statusText = await hireTeacher(input);
    setStatus(
      statusText
        ? {
            text: "Contrato realizado com sucesso!",
            color: "#49cc90",
          }
        : {
            text: "Erro ao contratar o professor.",
            color: "#ff0000",
          }
    );
  }

  return (
    <Dialog open={open} fullWidth maxWidth="xs">
      <DialogTitle id="title" onClose={onClose}>
        Formulário de Contratação
      </DialogTitle>
      <DialogContent className={classes.dialog}>
        <Grid container item xs={12} spacing={2}>
          <Grid item xs={12}>
            <MaskedInputCTL
              label="Data Início"
              format="##/##/####"
              mask="_"
              className={classes.input}
              error={!!errors.dataInicioPrestacao?.message}
              helperText={errors.dataInicioPrestacao?.message}
              {...{ control, name: "dataInicioPrestacao" }}
            />
          </Grid>
          <Grid item xs={6}>
            <MaskedInputCTL
              label="Valor Hora"
              format="##"
              mask="_"
              error={!!errors.valorHora?.message}
              helperText={errors.valorHora?.message}
              {...{ control, name: "valorHora" }}
            />
          </Grid>
          <Grid item xs={6}>
            <InputCTL
              label="Horas Contratadas"
              error={!!errors.horasContratadas?.message}
              helperText={errors.horasContratadas?.message}
              {...{ control, name: "horasContratadas" }}
            />
          </Grid>
          <Grid item xs={6} style={{ display: "none" }}>
            {["professorId", "alunoId"].map((name) => (
              <InputCTL
                label="ProfessorID"
                format="##"
                mask="_"
                {...{ control, name }}
              />
            ))}
          </Grid>
          <Grid
            item
            xs={12}
            container
            direction="row"
            justify="center"
            alignContent="center"
          >
            <ButtonTM
              width="100%"
              height="40px"
              onClick={handleSubmit(onSubmit)}
            >
              Contratar
            </ButtonTM>
            {status && (
              <div style={{ marginTop: 12, color: status.color }}>
                {status.text}
              </div>
            )}
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
}
