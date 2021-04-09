import React from "react";
import { useHistory } from "react-router-dom";
import { Todo } from "@prisma/client";

import { TodoCreate, TodoCreateDto } from "../components";

import { http } from "@/libs/http";

export const TodoCreateContainer: React.FC = () => {
  const history = useHistory();
  const createTodo = async (data: TodoCreateDto) => {
    http.post<Todo>("/todos/new", data).then((res) => {
      history.push(`/todos/${res.id}`);
    });
  };
  return <TodoCreate submit={createTodo} />;
};
