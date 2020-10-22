import React from "react";
import CallUsers from "../apiCall/CallUsers.js";
import { Route, Redirect } from "react-router-dom";

export const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      if (CallUsers.isAuth() === false) {
        return <Redirect to="/" />;
      } else {
        return <Component {...props} />
      }
    }}
  />
);
