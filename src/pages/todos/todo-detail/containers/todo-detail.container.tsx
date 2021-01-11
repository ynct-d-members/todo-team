import React from "react";
import { TodoDetail } from "../components";

export const TodoDetailContainer: React.FC<{ id: number }> = (props) => {
  return <TodoDetail id={1} />;
};
