import { createStyles, Grid, makeStyles } from "@material-ui/core";
import useAxios from "axios-hooks";
import React from "react";
import { InputCTL } from "../../components/InputTM/inputCTL";
import { MaskedInputCTL } from "../../components/InputTM/maskedInput";
import { AutoCompleteCTL } from "../../components/SelectTM/AutoCompleteCTL";
import { ContainerPage } from "../../styles";

type Props = {
  formHandlers: any;
  disableInputs: boolean;
};

const useStyles = makeStyles(() =>
  createStyles({
    input: {
      width: "100%",
    },
  })
);

export default function UserForm({
  formHandlers,
  disableInputs = false,
}: Props) {
  const classes = useStyles();
  const { errors, control } = formHandlers;
  const [{ data: scholarity }] = useAxios("/v1/escolaridade");

  return (
    <>
      <Grid container xs={8} spacing={2} justify="center">
        <Grid item xs={6}>
          <InputCTL
            label="Nome Completo"
            className={classes.input}
            error={!!errors.nome?.message}
            disabled={disableInputs}
            helperText={errors.nome?.message}
            {...{ control, name: "nome" }}
          />
        </Grid>
        <Grid item xs={6}>
          <InputCTL
            label="E-mail"
            type="email"
            className={classes.input}
            disabled={disableInputs}
            error={!!errors.email?.message}
            helperText={errors.email?.message}
            {...{ control, name: "email" }}
          />
        </Grid>
        <Grid item xs={6}>
          <MaskedInputCTL
            label="Telefone"
            format="(##)#####-####"
            mask="_"
            disabled={disableInputs}
            className={classes.input}
            error={!!errors.telefone}
            helperText={errors.telefone?.message}
            {...{ control, name: "telefone" }}
          />
        </Grid>
        <Grid item xs={6}>
          <MaskedInputCTL
            label="Data de Nascimento"
            format="##/##/####"
            className={classes.input}
            mask="_"
            disabled={disableInputs}
            error={!!errors.dataNascimento}
            helperText={errors.dataNascimento?.message}
            {...{ control, name: "dataNascimento" }}
          />
        </Grid>
        <Grid item xs={6}>
          <AutoCompleteCTL
            label="Nível de Escolaridade"
            options={
              scholarity?.map((d: any) => ({
                id: d.id,
                label: d.descricao,
              })) ?? []
            }
            disabled={disableInputs}
            error={!!errors.escolaridade}
            helperText={(errors.escolaridade as any)?.message}
            {...{ control, name: "escolaridade" }}
          />
        </Grid>
        <Grid item container xs={6}>
          <Grid item xs={10}>
            <InputCTL
              label="Cidade"
              className={classes.input}
              error={!!errors.cidade}
              disabled={disableInputs}
              helperText={errors.cidade?.message}
              {...{ control, name: "cidade" }}
            />
          </Grid>
          <Grid item xs={2}>
            <InputCTL
              label="UF"
              className={classes.input}
              inputProps={{ maxLength: 2 }}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                String(e.target.value).toUpperCase()
              }
              error={!!errors.uf}
              disabled={disableInputs}
              helperText={errors.uf?.message}
              {...{ control, name: "uf" }}
            />
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
