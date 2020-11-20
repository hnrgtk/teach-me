import React, { useState } from "react";

import { Box, IconButton, InputAdornment, Typography } from "@material-ui/core";
import { useForm } from "react-hook-form";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { Link, useHistory } from "react-router-dom";
import { InputCTL } from "../../components/InputTM/inputCTL";
import { signIn } from "../../services/userServices";
import { Container, LoginBox, SignInButton } from "./styles";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoginFormType, loginSchema } from "./formType";

export default function Login() {
  const { control, handleSubmit, errors } = useForm<LoginFormType>({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: "hnrtk@hotmail.com",
      senha: "12345",
    },
  });
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const history = useHistory();

  const handleShowPassword = () =>
    setShowPassword((prevState: boolean) => !prevState);

  async function handleLogin(values: LoginFormType) {
    const response = await signIn(values.email, values.senha);
    localStorage.setItem("loginToken", String(response?.data.token));
    history.push("/home");
  }

  return (
    <>
      <Container>
        <LoginBox elevation={5}>
          <Typography align="center" variant="h5">
            TEACH ME!
          </Typography>
          <InputCTL
            label="E-mail"
            type="email"
            error={!!errors.email}
            helperText={errors.email?.message}
            {...{ control, name: "email" }}
          />
          <InputCTL
            label="Senha"
            type={showPassword ? "text" : "password"}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleShowPassword}
                    onMouseDown={(e: any) => e.preventDefault()}
                  >
                    {showPassword ? <FiEye /> : <FiEyeOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            error={!!errors.senha}
            helperText={errors.senha?.message}
            {...{ control, name: "senha" }}
          />
          <Box display="flex" justifyContent="flex-end">
            <Link to="/cadastrar">Esqueceu a senha?</Link>
          </Box>
          <SignInButton
            variant="contained"
            color="primary"
            onClick={handleSubmit(handleLogin)}
          >
            Entrar
          </SignInButton>

          <Box display="flex" justifyContent="center" marginTop="16px">
            <Typography style={{ marginRight: 4 }} variant="body2">
              Não tem uma conta?
            </Typography>
            <Link to="/cadastrar">Cadastre-se</Link>
          </Box>
        </LoginBox>
      </Container>
    </>
  );
}
