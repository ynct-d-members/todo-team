import React from "react";
import { useState, useEffect } from "react";

import { Todo } from "@prisma/client";
import { http } from "../../../../libs/http";

import { TodoDetail } from "../components";
import { initialState } from "../../todo.state";

export const TodoDetailContainer: React.FC<{ id: number }> = (props) => {
  const [todo, setTodo] = useState(initialState);

  useEffect(() => {
    const fetch = async () => {
      const result = await http.get<Todo>(`./todos/${props.id}`);
      setTodo(result);
    };
    fetch();
  }, [props.id]);

  return <TodoDetail todo={todo} />;
};
