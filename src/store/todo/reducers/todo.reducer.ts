import { createReducer } from "@reduxjs/toolkit";

import { initialState, adapter } from "../states";
import { fetchAllTodos } from "../actions";

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(fetchAllTodos.pending, (state) => {
      return { ...state, isFetching: true };
    })
    .addCase(fetchAllTodos.fulfilled, (state, action) => {
      const { todos } = action.payload;
      return adapter.setAll({ ...state, isFetching: false }, todos);
    })
    .addCase(fetchAllTodos.rejected, (state) => {
      return { ...state, isFetching: false };
    });
});
