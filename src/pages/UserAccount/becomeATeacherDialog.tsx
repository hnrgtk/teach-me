import {
  createStyles,
  Dialog,
  DialogContent,
  Grid,
  makeStyles,
  CircularProgress
} from "@material-ui/core";
import useAxios from "axios-hooks";
import React, { useState } from "react";
import { UseFormMethods } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { ButtonTM } from "../../components/ButtonTM";
import { InputCTL } from "../../components/InputTM/inputCTL";
import { AutoCompleteCTL } from "../../components/SelectTM/AutoCompleteCTL";
import {
  becomeATeacher,
  TeacherApplicationForm,
} from "../../services/teacherService";

import { DialogTitle } from "../Teacher/styles";
import { BecomeATeacherFormType } from "./formType";

type Props = {
  formHandlers: UseFormMethods<BecomeATeacherFormType>;
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

export default function BecomeATeacherDialog({
  formHandlers,
  open,
  onClose,
}: Props) {
  const classes = useStyles();
  const { push } = useHistory();
  const { control, errors, handleSubmit } = formHandlers;
  const [status, setStatus] = useState<Record<string, string | string>>();
  const [{ data: disciplines }] = useAxios("/v1/disciplina");
  const [{ data: teachingType }] = useAxios("/v1/modalidadeEnsino");
  const [{ data: scholarity }] = useAxios("/v1/escolaridade");
  const [loading, setLoading] = useState<boolean>(false);

  async function onSubmit(values: BecomeATeacherFormType) {
    setLoading(true);
    const input = {
      ...values,
      disciplinas: [
        {
          id: values.disciplinas.id,
          descricao: values.disciplinas.label,
          ativo: true,
        },
      ],
      modalidadeEnsinoId: values.modalidadeEnsinoId.id,
      escolaridaPubAlvoId: values.escolaridaPubAlvoId.id,
    } as TeacherApplicationForm;

    const statusText = await becomeATeacher(input, setLoading);
    setStatus(
      statusText
        ? {
            text: "Cadastro concluído com sucesso!",
            color: "#49cc90",
          }
        : {
            text: "Erro ao cadastro como professor.",
            color: "#ff0000",
          }
    );

    localStorage.setItem("userCharge", "professor");
    statusText && setTimeout(() => push("/home"), [1000]);

    setStatus({ text: "", color: "" });
  }
  return (
    <Dialog open={open} fullWidth maxWidth="xs">
      <DialogTitle id="title" onClose={onClose}>
        Cadastro para Professor
      </DialogTitle>
      <DialogContent className={classes.dialog}>
        <Grid container item xs={12} spacing={2}>
          <Grid item xs={12}>
            <InputCTL
              label="E-mail"
              type="email"
              className={classes.input}
              error={!!errors.email?.message}
              helperText={errors.email?.message}
              {...{ control, name: "email" }}
            />
          </Grid>
          <Grid item xs={12}>
            <InputCTL
              label="Senha"
              type="password"
              autoComplete="false"
              className={classes.input}
              error={!!errors.senha?.message}
              helperText={errors.senha?.message}
              {...{ control, name: "senha" }}
            />
          </Grid>
          <Grid item xs={12}>
            <InputCTL
              label="Descrição"
              className={classes.input}
              error={!!errors.descricao?.message}
              helperText={errors.descricao?.message}
              {...{ control, name: "descricao" }}
            />
          </Grid>
          <Grid item xs={12}>
            <AutoCompleteCTL
              label="Disciplina"
              options={
                disciplines?.map((d: any) => ({
                  id: d.id,
                  label: d.descricao,
                })) ?? []
              }
              error={!!errors.disciplinas}
              helperText={(errors.disciplinas as any)?.message}
              {...{ control, name: "disciplinas" }}
            />
          </Grid>
          <Grid item xs={12}>
            <AutoCompleteCTL
              label="Modalidade de Ensino"
              options={
                teachingType?.map((d: any) => ({
                  id: d.id,
                  label: d.descricao,
                })) ?? []
              }
              error={!!errors.modalidadeEnsinoId}
              helperText={(errors.modalidadeEnsinoId as any)?.message}
              {...{ control, name: "modalidadeEnsinoId" }}
            />
          </Grid>
          <Grid item xs={12}>
            <AutoCompleteCTL
              label="Público Alvo"
              options={
                scholarity?.map((d: any) => ({
                  id: d.id,
                  label: d.descricao,
                })) ?? []
              }
              error={!!errors.escolaridaPubAlvoId}
              helperText={(errors.escolaridaPubAlvoId as any)?.message}
              {...{ control, name: "escolaridaPubAlvoId" }}
            />
          </Grid>
          <Grid item xs={12}>
            <InputCTL
              label="Valor por Hora"
              type="number"
              className={classes.input}
              error={!!errors.valorHora?.message}
              helperText={errors.valorHora?.message}
              {...{ control, name: "valorHora" }}
            />
          </Grid>
          <Grid item xs={6} style={{ display: "none" }}>
            {["usuarioId"].map((name) => (
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
              {loading ? (
                <CircularProgress color="secondary" size={26} />
              ) : (
                "Cadastrar"
              )}
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
