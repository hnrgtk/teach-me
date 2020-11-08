import { CircularProgress, Grid, Typography } from "@material-ui/core";
import useAxios from "axios-hooks";
import moment from "moment";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { InputCTL } from "../../components/InputTM/inputCTL";
import { MaskedInputCTL } from "../../components/InputTM/maskedInput";
import { AutoCompleteCTL } from "../../components/SelectTM/AutoCompleteCTL";
import { signUp, SignUpVariables } from "../../services/userServices";
import { Container, SignInButton, SignUpBox } from "./styles";

export type SignUpFormType = {
  nome: string;
  dataNascimento: string;
  email: string;
  senha: string;
  telefone: string;
  escolaridade: {
    id: string;
    label: string;
  };
  tipoDocumento: {
    id: string;
    label: string;
  };
  nuDocumento: string;
  uf: string;
  cidade: string;
};

export default function SignUp() {
  const { control, handleSubmit } = useForm<SignUpFormType>();
  const [{ data }] = useAxios("/v1/escolaridade");
  const [loading, setLoading] = useState<boolean>(false);

  function onSubmit(values: SignUpFormType) {
    setLoading(true);
    const input = {
      nome: values.nome,
      email: values.email,
      senha: values.senha,
      dataNascimento: moment(values.dataNascimento, "DD/MM/YYYY").toISOString(),
      cidade: values.cidade,
      uf: values.uf,
      escolaridadeId: values.escolaridade.id,
      tipoDocumento: values.tipoDocumento.id,
      nuDocumento: values.nuDocumento,
      telefone: values.telefone.replace(/[^a-zA-Z0-9 ]/g, ""),
    } as SignUpVariables;

    signUp(input, setLoading);
  }

  return (
    <>
      <Container>
        <SignUpBox>
          <Typography align="center" variant="h5">
            Cadastro
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
          <MaskedInputCTL
            label="Telefone"
            format="(##)#####-####"
            mask="_"
            {...{ control, name: "telefone" }}
          />
          <AutoCompleteCTL
            label="Tipo de Documento"
            options={[
              { label: "CPF", id: "CPF" },
              { label: "RG", id: "RG" },
            ]}
            {...{ control, name: "tipoDocumento" }}
          />
          <InputCTL
            label="N° do Documento"
            mask="_"
            {...{ control, name: "nuDocumento" }}
          />
          <AutoCompleteCTL
            label="Nível de Escolaridade"
            options={
              data?.map((d: any) => ({
                id: d.id,
                label: d.descricao,
              })) ?? []
            }
            {...{ control, name: "escolaridade" }}
          />
          <Grid container>
            <Grid item xs={8}>
              <InputCTL label="Cidade" {...{ control, name: "cidade" }} />
            </Grid>
            <Grid item xs={4}>
              <InputCTL
                label="UF"
                inputProps={{ maxlength: 2 }}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  String(e.target.value).toUpperCase()
                }
                {...{ control, name: "uf" }}
              />
            </Grid>
          </Grid>
          <SignInButton
            variant="contained"
            color="primary"
            onClick={handleSubmit(onSubmit)}
          >
            {loading ? (
              <CircularProgress color="secondary" size={26} />
            ) : (
              " Criar conta"
            )}
          </SignInButton>
        </SignUpBox>
      </Container>
    </>
  );
}
