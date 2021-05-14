import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { AuthPage } from "./auth";

export const Routes: React.FC = () => {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/" component={AuthPage} />
        </Switch>
      </Router>
    </>
  );
};
