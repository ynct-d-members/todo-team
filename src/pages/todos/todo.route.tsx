import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { TodoDetailPage } from "./todo-detail";
import { TodoListPage } from "./todo-list";
import { TodoCreatePage } from "./todo-create";

export const Routes: React.FC = () => {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/todos" component={TodoListPage} />
          <Route exact path="/todos/new" component={TodoCreatePage} />
          <Route exact path="/todos/:id" component={TodoDetailPage} />
        </Switch>
      </Router>
    </>
  );
};
