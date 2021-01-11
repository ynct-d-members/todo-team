import React from "react";
import { render } from "@testing-library/react";
import { App } from "./App";
import { TodoDetailContainer } from "./pages/todos/todo-detail";

test("renders todo which id === 1", () => {
  render(<App />);
  render(<TodoDetailContainer id={1} />);
});
