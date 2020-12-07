import { yupResolver } from "@hookform/resolvers/yup";
import { makeStyles, createStyles, Typography, Grid } from "@material-ui/core";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ButtonTM } from "../../components/ButtonTM";
import { TeacherApplicationForm } from "../../services/teacherService";
import { getUserById } from "../../services/userServices";
import { ContainerPage } from "../../styles";
import { useLogin } from "../../utils/login";
import { SignUpFormType, signUpSchema } from "../Login/formType";
import BecomeATeacherDialog from "./becomeATeacherDialog";
import UserForm from "./form";
import { BecomeATeacherFormType, becomeATeacherSchema } from "./formType";

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
  const { getUserId, getUserCharge } = useLogin();
  const id = getUserId();
  const charge = getUserCharge();
  console.log(charge);

  const [open, setOpen] = useState<boolean>(false);

  const formHandlers = useForm<SignUpFormType>({
    resolver: yupResolver(signUpSchema),
  });
  const formTeacher = useForm<BecomeATeacherFormType>({
    resolver: yupResolver(becomeATeacherSchema),
  });

  const { reset } = formHandlers;
  const { reset: resetTeacher } = formTeacher;

  const handleClose = () => setOpen(false);

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
      resetTeacher({
        usuarioId: Number(id),
      });
    }
    getUserData();
  }, []);

  return (
    <>
      <BecomeATeacherDialog
        formHandlers={formTeacher}
        open={open}
        onClose={handleClose}
      />
      <ContainerPage className={classes.container}>
        <Typography align="center" variant="h5">
         Dados da Conta
        </Typography>
        <UserForm formHandlers={formHandlers} disableInputs />
        {charge !== "professor" && (
          <Grid
            container
            item
            xs={12}
            justify="center"
            className={classes.grid}
          >
            <ButtonTM width="140px" height="40px" onClick={() => setOpen(true)}>
              Tornar Professor
            </ButtonTM>
          </Grid>
        )}
      </ContainerPage>
    </>
  );
}
