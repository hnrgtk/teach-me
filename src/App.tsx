import React from "react";
import Routes from "./Routes";
import { CssBaseline } from "@material-ui/core";
import { StylesProvider, ThemeProvider } from "@material-ui/core/styles";

import { ThemeProvider as StyledThemeProvider } from "styled-components";
import { theme } from "./styles";
function App() {
  return (
    <>
      <CssBaseline />
      <StylesProvider injectFirst>
        <StyledThemeProvider theme={theme}>
          <ThemeProvider theme={theme}>
            <Routes />
          </ThemeProvider>
        </StyledThemeProvider>
      </StylesProvider>
    </>
  );
}

export default App;
