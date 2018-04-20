import React from "react";
import { Route, Switch, Link, Redirect } from "react-router-dom";
import Login from "../containers/Login";
import Items from "../containers/Items";
import Profile from "../containers/Profile";

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" component={Items} />
      <Route path="/profile/:itemownerId" component={Profile} />
    </Switch>
  );
};

export default Routes;
