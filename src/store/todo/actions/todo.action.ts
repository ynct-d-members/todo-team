import { createAsyncThunk } from "@reduxjs/toolkit";

import { http } from "../../../libs/http";
import { featureKey } from "../states";
import { Todo, TodoCreateDto, TodoUpdateDto } from "@/models";
import { todos } from "api/mocks/todo-mock";

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

export const createTodo = createAsyncThunk(
  `${featureKey}/create`,
  async (arg: { todo: TodoCreateDto }) => {
    const { todo } = arg;
    const result = await http.post<Todo>("/todos/new", todo);
    return { todo: result };
  }
);

export const updateTodo = createAsyncThunk(
  `${featureKey}/update`,
  async (arg: { id: string; todo: TodoUpdateDto }) => {
    const { id, todo } = arg;
    const result = await http.patch<Todo>(`/todo/${id}`, todo);
    return { todo: result };
  }
);

export const removeTodo = createAsyncThunk(
  `${featureKey}/remove`,
  async (arg: { id: string }) => {
    const { id } = arg;
    const result = await http.remove<Todo>(`/todo/${id}`);
    return { id: result.id };
  }
);
