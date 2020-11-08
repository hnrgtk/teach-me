import React from "react";
import { Box } from "@material-ui/core";
import { useLocation } from "react-router-dom";
import { auth } from "../../services/userServices";
import { Container, LoginBox, SignInButton } from "./styles";

export default function Auth() {
  const params = new URLSearchParams(useLocation().search);

  return (
    <>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <SignInButton
          variant="contained"
          color="primary"
          onClick={() => auth(String(params.get("cadastro")))}
          style={{ width: 200, height: 60, fontSize: 16 }}
        >
          Validar Cadastro
        </SignInButton>
      </Box>
    </>
  );
}
