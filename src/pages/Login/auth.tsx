import React, { useEffect, useState } from "react";
import { Box, CircularProgress } from "@material-ui/core";
import { useLocation } from "react-router-dom";
import { auth } from "../../services/userServices";

export default function Auth() {
  const params = new URLSearchParams(useLocation().search);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    auth(String(params.get("cadastro")), setLoading);
  }, [params]);

  return (
    <>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        {loading ? (
          <CircularProgress color="secondary" size={26} />
        ) : (
          "Cadastro validado com sucesso!"
        )}
      </Box>
    </>
  );
}
