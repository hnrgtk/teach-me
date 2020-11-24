import { useContext } from "react";

import { createMuiTheme } from "@material-ui/core/styles";

import styled, { ThemeContext } from "styled-components";

export const MuiTheme = createMuiTheme({
  palette: {
    primary: {
      main: "#796eff",
      // light: "#6bcdcd",
      // dark: "#6bcdcd",
    },
    secondary: { main: "#fff" },
  },
  typography: {
    fontFamily: ["Open Sans", "sans-serif"].join(","),
    button: {
      textTransform: "none",
    },
  },
});

export const theme = {
  ...MuiTheme,
  palette: {
    ...MuiTheme.palette,
    typographyColor: "#454545",
    background: {
      ...MuiTheme.palette.background,
      contrast: "#F5F7FB",
    },
  },
  notBroken: null,
};

export function useStyledTheme() {
  return useContext(ThemeContext);
}

export type ITheme = typeof theme;

declare module "styled-components" {
  export interface DefaultTheme extends ITheme {
    notBroken: unknown;
  }
}

export const ContainerPage = styled.div`
  padding: 28px 40px;
  width: 100%;
`;
