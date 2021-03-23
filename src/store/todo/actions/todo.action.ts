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
