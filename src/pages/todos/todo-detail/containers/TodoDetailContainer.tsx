import React from "react";
import TodoDetail from "../components/TodoDetail";

const TodoDetailContainer: React.FC<{ id: number }> = (props) => {
  return <TodoDetail id={1} />;
};

export default TodoDetailContainer;
