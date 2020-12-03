import React from "react";
import { CircularProgress } from "@material-ui/core";
import { StyledButton } from "./styles";

type ButtonTMProps = React.ComponentProps<typeof StyledButton> & {
  loading?: boolean;
};

export const ButtonTM = ({ children, loading, ...rest }: ButtonTMProps) => (
  <StyledButton color="primary" variant="contained" {...rest}>
    {children}
    {loading && <CircularProgress size={26} color="secondary" />}
  </StyledButton>
);
