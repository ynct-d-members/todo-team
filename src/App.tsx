import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Routes } from "./pages/todos/todo.route";

export function App() {
  return (
    <div className="App">
      <Routes />
    </div>
  );
}
