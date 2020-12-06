import { yupResolver } from "@hookform/resolvers/yup";
import { makeStyles, createStyles, Typography, Grid } from "@material-ui/core";
import moment from "moment";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { ButtonTM } from "../../components/ButtonTM";
import { getUserById } from "../../services/userServices";
import { ContainerPage } from "../../styles";
import { useLogin } from "../../utils/login";
import { SignUpFormType, signUpSchema } from "../Login/formType";
import UserForm from "./form";

const useStyles = makeStyles(() =>
  createStyles({
    container: {
      width: "100%",
      padding: "80px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    },
    grid: {
      marginTop: 18,
    },
  })
);

export default function UserAccount() {
  const classes = useStyles();
  const { getUserId } = useLogin();
  const id = getUserId();

  const formHandlers = useForm<SignUpFormType>({
    resolver: yupResolver(signUpSchema),
  });

  const { reset } = formHandlers;

  useEffect(() => {
    async function getUserData() {
      const userData = await getUserById(id);
      reset({
        ...userData,
        escolaridade: {
          id: userData.escolaridade.id,
          label: userData.escolaridade.descricao,
        },
        dataNascimento: moment(userData.dataNascimento).format("DD/MM/YYYY"),
      });
    }
    getUserData();
  }, []);
  return (
    <ContainerPage className={classes.container}>
      <Typography align="center" variant="h5">
        Seus Dados
      </Typography>
      <UserForm formHandlers={formHandlers} />
      <Grid container item xs={12} justify="center" className={classes.grid}>
        <ButtonTM width="140px" height="40px">
          Tornar Professor
        </ButtonTM>
      </Grid>
    </ContainerPage>
  );
}
