import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";
import TodoDetailContainer from "./pages/todos/todo-detail/containers/todo-detail.container";

test("renders todo which id === 1", () => {
  render(<App />);
  render(<TodoDetailContainer id={1} />);
});
