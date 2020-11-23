import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Header from "./components/Header";
import { PrivateRoute } from "./components/PrivateRoute";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Auth from "./pages/Login/auth";
import SignUp from "./pages/Login/signup";
import UserAccount from "./pages/UserAccount";

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/cadastrar" component={SignUp} />
        <Route path="/validarCadastro" component={Auth} />
        <div>
          <Header />
          <main>
            <Switch>
              <PrivateRoute path="/home" component={Home} />
              <PrivateRoute path="/minhaconta" component={UserAccount} />
            </Switch>
          </main>
        </div>
        <Route path="*" component={() => <h1>Page not found</h1>} />
      </Switch>
    </BrowserRouter>
  );
}
