import React from "react";
import { TextField, OutlinedTextFieldProps } from "@material-ui/core";

type InputTMProps = Omit<OutlinedTextFieldProps, "variant">;

export const InputTM = ({ ...rest }: InputTMProps) => (
  <TextField
    variant="outlined"
    size="small"
    color="primary"
    margin="normal"
    {...rest}
  />
);
