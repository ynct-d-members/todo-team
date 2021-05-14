import React from "react";
import "./App.css";
import { Suspense } from "react";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import { TodoRoute, AuthPage } from "./pages";

export const App: React.FC = () => {
  return (
    <>
      <Suspense fallback={null}>
        <div className="App">
          <Router>
            <Switch>
              <Route exact path="/todos" component={TodoRoute} />
              <Route exact path="/" component={AuthPage} />
            </Switch>
          </Router>
        </div>
      </Suspense>
    </>
  );
};
