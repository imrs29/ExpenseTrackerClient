import React from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";

const AdminRoute = ({ component: Component, ...rest }) => {
  //check if user is loggin
  const userLogin = useSelector((state) => state?.users?.userAuth);
  console.log(userLogin);
  return (
    <Route
      {...rest}
      render={() =>
        userLogin.isAdmin ? (
          <Component {...rest} />
        ) : (
          <Redirect to="/not-found" />
        )
      }
    />
  );
};

export default AdminRoute;
