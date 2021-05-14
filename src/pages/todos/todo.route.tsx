import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { TodoDetailPage } from "./todo-detail";
import { TodoListPage } from "./todo-list";
import { TodoCreatePage } from "./todo-create";
import { TodoEditPage } from "./todo-edit";

export const TodoRoute: React.FC = () => {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/todos" component={TodoListPage} />
          <Route exact path="/todos/new" component={TodoCreatePage} />
          <Route exact path="/todos/:id" component={TodoDetailPage} />
          <Route exact path="/todos/edit/:id" component={TodoEditPage} />
          <Route exact path="/" component={TodoListPage} />
        </Switch>
      </Router>
    </>
  );
};
