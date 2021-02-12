import * as React from "react";
import { useState, useEffect } from "react";

import { Todo } from "@prisma/client";
import { http } from "../../../../libs/http";

import { TodoListComponent } from "../components";
import { initialState } from "../../todo.state";

type Todos = Todo[];

export const TodoListContainer: React.FC = () => {
  const [todos, setTodos] = useState<Todos>([initialState]);

  useEffect(() => {
    const fetch = async () => {
      const result = await http.get<Todos>("/todos");
      setTodos(result);
    };
    fetch();
  }, []);

  return <TodoListComponent todos={todos} />;
};
