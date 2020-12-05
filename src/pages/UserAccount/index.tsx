import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { getUserById } from "../../services/userServices";
import { useLogin } from "../../utils/login";
import { SignUpFormType, signUpSchema } from "../Login/formType";
import UserForm from "./form";

export default function UserAccount() {
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
      });
    }
    getUserData();
  }, []);
  return <UserForm formHandlers={formHandlers} />;
}
