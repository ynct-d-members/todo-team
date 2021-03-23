import * as React from "react";
import { useEffect } from "react";

import { TodoListComponent } from "../components";
import { useTodoStore } from "../../../../store";

export const TodoListContainer: React.FC = () => {
  const { todos, fetchAll } = useTodoStore();

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  return <TodoListComponent todos={todos} />;
};
