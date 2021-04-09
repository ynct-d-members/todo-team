import React from "react";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";

import { Todo } from "@prisma/client";
import { http } from "../../../../libs/http";

import { TodoDetail } from "../components";
import { useTodoStore } from "../../../../store";

export const TodoDetailContainer: React.FC<{ id: string }> = (props) => {
  const history = useHistory();
  const { fetch, todo } = useTodoStore();

  const deleteTodo = async (id: number) => {
    http.remove<Todo>(`/todos/delete/${id}`).then((res) => {
      history.push("/todos");
    });
  };

  useEffect(() => {
    fetch({ id: props.id });
  }, [props.id, fetch]);

  return <TodoDetail todo={todo} deleteFunc={deleteTodo} />;
};
