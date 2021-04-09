import { createAsyncThunk } from "@reduxjs/toolkit";

import { Todo } from "@prisma/client";
import { http } from "../../../libs/http";
import { featureKey } from "../states";

export const fetchAllTodos = createAsyncThunk(
  `${featureKey}/fetchAll`,
  async () => {
    const result = await http.get<Todo[]>("/todos");
    return { todos: result };
  }
);

export const fetchTodo = createAsyncThunk(
  `${featureKey}/fetch`,
  async (arg: { id: string }) => {
    const { id } = arg;
    const result = await http.get<Todo>(`/todos/${id}`);
    return { todo: result };
  }
);
