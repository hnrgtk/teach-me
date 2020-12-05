import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useLogin } from "../../utils/login";

type Props = {
  component: React.ComponentType<any>;
  redirectTo?: string;
  path: string;
  [key: string]: any;
};

export function PrivateRoute({
  component: Component,
  redirectTo = "/",
  path,
  ...rest
}: Props) {
  const { isUserLogged } = useLogin();

  const isLogged = isUserLogged();
  return (
    <Route
      {...rest}
      render={(routerProps) =>
        isLogged ? (
          <Component {...routerProps} />
        ) : (
          <Redirect to={redirectTo} from={path} />
        )
      }
    />
  );
}
