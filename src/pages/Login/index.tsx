import { Box, IconButton, InputAdornment, Typography } from "@material-ui/core";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { Link } from "react-router-dom";
import { InputCTL } from "../../components/InputTM/inputCTL";
import { fazerLogin } from "../../services/usuarioService";
import { Container, LoginBox, SignInButton } from "./styles";

type LoginFormType = {
  email: string;
  senha: string;
};
interface LoginProps {
  email: string;
  senha: string;
}

export default function Login() {
  function handleLogin(values: LoginProps) {
    fazerLogin(values.email, values.senha);
  }

  const { control, handleSubmit } = useForm<LoginFormType>();
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleShowPassword = () =>
    setShowPassword((prevState: boolean) => !prevState);

  return (
    <>
      <Container>
        <LoginBox elevation={5}>
          <Typography align="center" variant="h5">
            TEACH ME!
          </Typography>
          <InputCTL label="E-mail" {...{ control, name: "email" }} />
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
            {...{ control, name: "senha" }}
          />
          <Box display="flex" justifyContent="flex-end">
            <Link
              // variant="caption"
              // color="textPrimary"
              // underline="always"
              // component="button"
              // onClick={() => console.log("teste")}
              to="/cadastrar"
            >
              Esqueceu a senha?
            </Link>
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
