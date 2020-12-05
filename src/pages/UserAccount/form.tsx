import { createStyles, Grid, makeStyles } from "@material-ui/core";
import React from "react";
import { InputCTL } from "../../components/InputTM/inputCTL";
import { MaskedInputCTL } from "../../components/InputTM/maskedInput";
import { AutoCompleteCTL } from "../../components/SelectTM/AutoCompleteCTL";
import { ContainerPage } from "../../styles";
import { scholarity } from "../Login/signup";

type Props = {
  formHandlers: any;
};

const useStyles = makeStyles(() =>
  createStyles({
    input: {
      width: "100%",
    },
    container: {
      width: "100%",
      padding: "80px",
      display: "flex",
      justifyContent: "center",
    },
  })
);

export default function UserForm({ formHandlers }: Props) {
  const classes = useStyles();
  const { errors, control } = formHandlers;

  return (
    <ContainerPage className={classes.container}>
      <Grid container xs={8} spacing={2} justify="center">
        <Grid item xs={6}>
          <InputCTL
            label="Nome Completo"
            className={classes.input}
            error={!!errors.nome?.message}
            helperText={errors.nome?.message}
            {...{ control, name: "nome" }}
          />
        </Grid>
        <Grid item xs={6}>
          <InputCTL
            label="E-mail"
            type="email"
            className={classes.input}
            error={!!errors.email?.message}
            helperText={errors.email?.message}
            {...{ control, name: "email" }}
          />
        </Grid>
        <Grid item xs={6}>
          <InputCTL
            label="Senha"
            error={!!errors.senha}
            className={classes.input}
            helperText={errors.senha?.message}
            {...{ control, name: "senha" }}
          />
        </Grid>
        <Grid item xs={6}>
          <MaskedInputCTL
            label="Telefone"
            format="(##)#####-####"
            mask="_"
            className={classes.input}
            error={!!errors.telefone}
            helperText={errors.telefone?.message}
            {...{ control, name: "telefone" }}
          />
        </Grid>
        <Grid item xs={4}>
          <MaskedInputCTL
            label="Data de Nascimento"
            format="##/##/####"
            className={classes.input}
            mask="_"
            error={!!errors.dataNascimento}
            helperText={errors.dataNascimento?.message}
            {...{ control, name: "dataNascimento" }}
          />
        </Grid>
        <Grid item xs={4}>
          <AutoCompleteCTL
            label="Tipo de Documento"
            options={[
              { label: "CPF", id: "CPF" },
              { label: "RG", id: "RG" },
            ]}
            error={!!errors.tipoDocumento}
            helperText={(errors.tipoDocumento as any)?.message}
            {...{ control, name: "tipoDocumento" }}
          />
        </Grid>
        <Grid item xs={4}>
          <InputCTL
            label="N° do Documento"
            mask="_"
            className={classes.input}
            error={!!errors.nuDocumento}
            helperText={errors.nuDocumento?.message}
            {...{ control, name: "nuDocumento" }}
          />
        </Grid>
        <Grid item xs={6}>
          <AutoCompleteCTL
            label="Nível de Escolaridade"
            options={
              scholarity.map((d: any) => ({
                id: d.id,
                label: d.descricao,
              })) ?? []
            }
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
              helperText={errors.uf?.message}
              {...{ control, name: "uf" }}
            />
          </Grid>
        </Grid>
      </Grid>
    </ContainerPage>
  );
}
