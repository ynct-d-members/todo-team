import React from "react";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Todo } from "@prisma/client";

import { useTodoStore } from "@/store";
import { TodoEdit, TodoUpdateDto } from "../components";

import { http } from "@/libs/http";

export const TodoEditContainer: React.FC<{ id: string }> = (props) => {
  const { id } = props;
  const history = useHistory();
  const { fetch, todo } = useTodoStore();

  const updateTodo = async (data: TodoUpdateDto) => {
    http.patch<Todo>(`/todos/${id}`, data).then((res) => {
      history.push(`/todos/${res.id}`);
    });
  };

  useEffect(() => {
    fetch({ id });
  }, [id, fetch]);

  return <TodoEdit todo={todo} submit={updateTodo} />;
};
