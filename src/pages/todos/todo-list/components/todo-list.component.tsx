import * as React from "react";
import { NavLink } from "react-router-dom";

import { Todo } from "@prisma/client";

type Props = {
  todos: Todo[];
};

export const TodoListComponent: React.FC<Props> = (props) => {
  const { todos } = props;

  return (
    <>
      <h2>todo-list</h2>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <NavLink to={`/todos/${todo.id}`}>{todo.title}</NavLink>
          </li>
        ))}
      </ul>
    </>
  );
};
