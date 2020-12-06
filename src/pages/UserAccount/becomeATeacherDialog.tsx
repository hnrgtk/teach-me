import {
  createStyles,
  Dialog,
  DialogContent,
  Grid,
  makeStyles,
} from "@material-ui/core";
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
import { scholarity } from "../Login/signup";
import { DialogTitle } from "../Teacher/styles";
import { BecomeATeacherFormType } from "./formType";

type Props = {
  formHandlers: UseFormMethods<BecomeATeacherFormType>;
  open: boolean;
  onClose: () => void;
};

const disciplines = [
  {
    id: "1056a41f-72c5-4542-b085-1fea025c0047",
    descricao: "Artes",
    ativo: true,
  },
  {
    id: "463305c3-0368-d04d-827d-7fabeb13b6f2",
    descricao: "Sociologia",
    ativo: true,
  },
  {
    id: "5bad8c21-086f-5449-9068-1b53106fa01c",
    descricao: "Música",
    ativo: true,
  },
  {
    id: "6d61b02d-83ab-bf42-849a-44e4e0cce708",
    descricao: "História",
    ativo: true,
  },
  {
    id: "8dbb1362-0964-c646-9441-bd81f55e3077",
    descricao: "Matemática",
    ativo: true,
  },
  {
    id: "95a13821-0932-c441-aff4-c8bb16b614bd",
    descricao: "Geografia",
    ativo: true,
  },
  {
    id: "bce3194f-0918-3844-a904-d8d49182d1c9",
    descricao: "Ciência",
    ativo: true,
  },
  {
    id: "d91f8066-8d86-a24e-a09c-a15a5229a699",
    descricao: "Filosofia",
    ativo: true,
  },
  {
    id: "db4aa406-34b9-4443-bd2c-3cae86c764db",
    descricao: "Português",
    ativo: true,
  },
];

const teachingType = [
  { id: "52f8ad76-8f5a-474b-b8d4-e3274db20113", descricao: "EAD" },
  { id: "c82fa32e-a3a1-b540-8d04-a591b21ce307", descricao: "Presencial" },
];
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
  const { control, errors, handleSubmit} = formHandlers;
  const [status, setStatus] = useState<Record<string, string | string>>();

  async function onSubmit(values: BecomeATeacherFormType) {
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

    console.log(input);

    const statusText = await becomeATeacher(input);
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
                disciplines.map((d: any) => ({
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
                teachingType.map((d: any) => ({
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
                scholarity.map((d: any) => ({
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
              Cadastrar
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
