import { Box, Button, Card } from "@material-ui/core";
import "styled-components/macro";
import styled from "styled-components/macro";

export const Container = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export const LoginBox = styled(Card)`
  display: flex;
  flex-direction: column;
  padding: 24px;
  box-shadow: 0 5px 20px 0 rgba(21, 27, 38, 0.08);
`;

export const SignInButton = styled(Button)`
  color: #fff;
  margin-top: 24px;
`;
