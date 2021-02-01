import React from "react";
import { render } from "@testing-library/react";
import { App } from "./App";

test("renders todo which id === 1", () => {
  render(<App />);
});
