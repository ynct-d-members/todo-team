import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import TodoDetail from "./todo-detail/containers/TodoDetail";

const Routes: React.FC = () => {
  return (
    <>
      <Router>
        <div>
          <Route exact path="/" component={TodoDetail} />
        </div>
      </Router>
    </>
  );
};

export default Routes;
