import { EntityState, createEntityAdapter } from "@reduxjs/toolkit";

import { Todo } from "@prisma/client";

export const featureKey = "todos";

export interface TodoState extends EntityState<Todo> {
  isFetching: boolean;
}

export const adapter = createEntityAdapter<Todo>();

export const initialState: TodoState = adapter.getInitialState({
  isFetching: false,
});
