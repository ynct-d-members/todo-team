import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { TodoDetailPage } from "./todo-detail";
import { TodoListPage } from "./todo-list";

export const Routes: React.FC = () => {
  return (
    <>
      <Router>
        <div>
          <Route exact path="/todos" component={TodoListPage} />
          <Route exact path="/todos/:id" component={TodoDetailPage} />
        </div>
      </Router>
    </>
  );
};
