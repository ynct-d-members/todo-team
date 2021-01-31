import React from "react";
import { useState, useEffect } from "react";
import { Todo } from "@prisma/client";

import { http } from "../../../../libs/http";
import { TodoDetail } from "../components";

const initialState: Todo = {
  id: 0,
  title: "",
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const TodoDetailContainer: React.FC<{ id: string }> = (props) => {
  const [todo, setTodo] = useState(initialState);

  useEffect(() => {
    const fetch = async () => {
      const result = await http.get<Todo>(`./todo/1`);
      setTodo(result);
    };
    fetch();
  }, [props.id]);

  return <TodoDetail todo={todo} />;
};
