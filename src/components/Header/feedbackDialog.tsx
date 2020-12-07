import React, { useState } from "react";
import {
  createStyles,
  Dialog,
  DialogContent,
  Grid,
  makeStyles,
} from "@material-ui/core";
import { UseFormMethods } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { ButtonTM } from "../../components/ButtonTM";
import { InputCTL } from "../../components/InputTM/inputCTL";
import { DialogTitle } from "../../pages/Teacher/styles";
import { FeedbackFormType } from ".";
import { rateTeacher } from "../../services/teacherService";

type Props = {
  formHandlers: UseFormMethods<FeedbackFormType>;
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
      padding: 12,
    },
    input: {
      width: "100%",
      marginTop: 6,
    },
  })
);

export default function FeedbackDialog({ formHandlers, open, onClose }: Props) {
  const classes = useStyles();
  const { push } = useHistory();
  const { control, errors, handleSubmit } = formHandlers;
  const [status, setStatus] = useState<Record<string, string | string>>();

  async function onSubmit(values: FeedbackFormType) {
    const statusText = await rateTeacher(values);

    statusText && setTimeout(() => push("/home"), [1000]);
  }

  return (
    <Dialog open={open} fullWidth maxWidth="xs">
      <DialogTitle id="title" onClose={onClose}>
        Avaliar Professor
      </DialogTitle>
      <DialogContent className={classes.dialog}>
        <Grid container item xs={12} spacing={2}>
          <Grid item xs={12}>
            <InputCTL
              label="Nota"
              type="number"
              className={classes.input}
              error={!!errors.nota?.message}
              helperText={errors.nota?.message}
              {...{ control, name: "nota" }}
            />
          </Grid>
          <Grid item xs={12}>
            <InputCTL
              label="Observações"
              className={classes.input}
              error={!!errors.observacoes?.message}
              helperText={errors.observacoes?.message}
              {...{ control, name: "observacoes" }}
            />
          </Grid>
          <Grid item xs={6} style={{ display: "none" }}>
            {["aulaId", "professorId", "alunoId"].map((name) => (
              <InputCTL label="" {...{ control, name }} />
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
              Enviar avaliação
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
