import React from "react";

import { Grid, Typography } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import { useForm } from "react-hook-form";
import { InputCTL } from "../../components/InputTM/inputCTL";
import { InputTM } from "../../components/InputTM/inputTM";
import { MaskedInputCTL } from "../../components/InputTM/maskedInput";
import { Container, LoginBox } from "./styles";

type SignUpFormType = {
  nome: string;
  dataNascimento: Date;
  email: string;
  senha: string;
  telefone: string;
  escolaridade: string;
  tipoDocumento: string;
  nuDocumento: string;
  uf: string;
  cidade: string;
};

export default function SignUp() {
  const { control } = useForm<SignUpFormType>();

  return (
    <>
      <Container>
        <LoginBox>
          <Typography align="center" variant="h5">
            Criar Conta
          </Typography>
          <InputCTL label="Nome Completo" {...{ control, name: "nome" }} />
          <InputCTL label="E-mail" {...{ control, name: "email" }} />
          <InputCTL
            label="Senha"
            type="password"
            {...{ control, name: "senha" }}
          />
          <MaskedInputCTL
            label="Data de Nascimento"
            format="##/##/####"
            mask="_"
            {...{ control, name: "dataNascimento" }}
          />
          <Autocomplete
            options={[
              { label: "CPF", value: "CPF" },
              { label: "RG", value: "RG" },
            ]}
            renderOption={(option) => option.label}
            getOptionLabel={(option) => option.label}
            renderInput={(params) => (
              <InputTM {...params} label="Tipo de Documento" />
            )}
            size="small"
          />
          <InputCTL
            label="N° do Documento"
            mask="_"
            {...{ control, name: "nuDocumento" }}
          />
          <Grid container>
            <Grid item xs={8}>
              <InputCTL label="Cidade" {...{ control, name: "cidade" }} />
            </Grid>
            <Grid item xs={4}>
              <InputCTL
                label="UF"
                onChange={(e: any) => console.log(e)}
                {...{ control, name: "uf" }}
              />
            </Grid>
          </Grid>
        </LoginBox>
      </Container>
    </>
  );
}
