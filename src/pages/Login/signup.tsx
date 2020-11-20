import { CircularProgress, Grid, Typography } from "@material-ui/core";
import useAxios from "axios-hooks";
import moment from "moment";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { InputCTL } from "../../components/InputTM/inputCTL";
import { MaskedInputCTL } from "../../components/InputTM/maskedInput";
import { AutoCompleteCTL } from "../../components/SelectTM/AutoCompleteCTL";
import { SignUpVariables, signUp } from "../../services/userServices";
import { SignUpFormType, signUpSchema } from "./formType";
import { Container, SignInButton, SignUpBox } from "./styles";
import { yupResolver } from "@hookform/resolvers/yup";

export default function SignUp() {
  const { control, handleSubmit, errors } = useForm<SignUpFormType>({
    resolver: yupResolver(signUpSchema),
    defaultValues: {
      nome: "Henry Gabriel",
      email: "hnrtk@hotmail.com",
      senha: "12345",
      dataNascimento: "14/10/1999",
      telefone: "71986220625",
      tipoDocumento: {
        id: "CPF",
        label: "CPF",
      },
      nuDocumento: "04524882570",
      cidade: "Dias davila",
      uf: "BA",
    },
  });
  const [{ data }] = useAxios("/v1/escolaridade");
  const [loading, setLoading] = useState<boolean>(false);
  const rules = {
    required: true,
  };

  function onSubmit(values: SignUpFormType) {
    setLoading(true);
    console.log(values);
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
          <InputCTL
            label="Nome Completo"
            error={!!errors.nome?.message}
            helperText={errors.nome?.message}
            {...{ control, name: "nome" }}
          />
          <InputCTL
            label="E-mail"
            type="email"
            error={!!errors.email?.message}
            helperText={errors.email?.message}
            {...{ control, name: "email" }}
          />
          <InputCTL
            label="Senha"
            type="password"
            error={!!errors.senha}
            helperText={errors.senha?.message}
            {...{ control, name: "senha" }}
          />
          <MaskedInputCTL
            label="Data de Nascimento"
            format="##/##/####"
            mask="_"
            rules={rules}
            error={!!errors.dataNascimento}
            helperText={errors.dataNascimento?.message}
            {...{ control, name: "dataNascimento" }}
          />
          <MaskedInputCTL
            label="Telefone"
            format="(##)#####-####"
            mask="_"
            rules={rules}
            error={!!errors.telefone}
            helperText={errors.telefone?.message}
            {...{ control, name: "telefone" }}
          />
          <AutoCompleteCTL
            label="Tipo de Documento"
            options={[
              { label: "CPF", id: "CPF" },
              { label: "RG", id: "RG" },
            ]}
            rules={rules}
            error={!!errors.tipoDocumento}
            helperText={(errors.tipoDocumento as any)?.message}
            {...{ control, name: "tipoDocumento" }}
          />
          <InputCTL
            label="N° do Documento"
            mask="_"
            rules={rules}
            error={!!errors.nuDocumento}
            helperText={errors.nuDocumento?.message}
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
            rules={rules}
            error={!!errors.escolaridade}
            helperText={(errors.escolaridade as any)?.message}
            {...{ control, name: "escolaridade" }}
          />
          <Grid container>
            <Grid item xs={8}>
              <InputCTL
                label="Cidade"
                rules={rules}
                error={!!errors.cidade}
                helperText={errors.cidade?.message}
                {...{ control, name: "cidade" }}
              />
            </Grid>
            <Grid item xs={4}>
              <InputCTL
                label="UF"
                inputProps={{ maxLength: 2 }}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  String(e.target.value).toUpperCase()
                }
                rules={rules}
                error={!!errors.uf}
                helperText={errors.uf?.message}
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
