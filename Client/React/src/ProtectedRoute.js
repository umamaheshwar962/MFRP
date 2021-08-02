import React from "react";
import { Redirect } from "react-router-dom";
import cookies from "js-cookie";

class ProtectedRoute extends React.Component {
  render() {
    const Component = this.props.component;
    const isAuth = cookies.get("clientToken");

    return isAuth ? (
      <Component />
    ) : (
      <Redirect to={{ pathname: "/login", search: "?login=false" }} />
    );
  }
}

class AdminProtected extends React.Component {
  render() {
    const Component = this.props.component;
    const isAuth = cookies.get("adminToken");

    return isAuth ? (
      <Component />
    ) : (
      <Redirect to={{ pathname: "/login", search: "?login=false" }} />
    );
  }
}

export { ProtectedRoute, AdminProtected };
