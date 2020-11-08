import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Login from "./pages/Login";
import Home from "./pages/Home";
import SignUp from "./pages/Login/signup";
import Auth from "./pages/Login/auth";

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/home" component={Home} />
        <Route path="/cadastrar" component={SignUp} />
        <Route path="/validarCadastro" component={Auth} />
      </Switch>
    </BrowserRouter>
  );
}
