import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@material-ui/core";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { Container, LoginBox } from "./styles";
import { useForm, Controller } from "react-hook-form";
import {
  fazerLogin
} from '../../services/usuarioService';

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

  const handleShowPassword = () => setShowPassword((prevState: boolean) => !prevState);

  return (
    <Container>
      <LoginBox>
        <Typography align="center" variant="h5">
          TEACH ME!
        </Typography>
        <Controller
          as={<TextField label="E-mail" variant="outlined" margin="normal" />}
          defaultValue=""
          {...{ control, name: "email" }}
        />
        <Controller
          as={
            <TextField
              label="Senha"
              variant="outlined"
              margin="normal"
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
            />
          }
          defaultValue=""
          {...{ control, name: "senha" }}
        />
        <Box display="flex" justifyContent="flex-end">
          <LinkMUI
            variant="body2"
            color="textPrimary"
            underline="none"
            component="button"
            onClick={() => console.log("teste")}
          >
            Esqueci a senha
          </LinkMUI>
        </Box>
        <Button onClick={handleSubmit(handleLogin)} >
          Entrar
        </Button>
      </LoginBox>
    </Container>
  );
}
