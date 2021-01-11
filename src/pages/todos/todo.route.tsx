import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import TodoDetailContainer from "./todo-detail/containers/todo-detail.container";

const Routes: React.FC = () => {
  return (
    <>
      <Router>
        <div>
          <Route exact path="/" component={TodoDetailContainer} />
        </div>
      </Router>
    </>
  );
};

export default Routes;
