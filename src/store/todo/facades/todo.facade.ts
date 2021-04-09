import { unwrapResult } from "@reduxjs/toolkit";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import { AppDispatch } from "../../store";
import { fetchAllTodos, fetchTodo } from "../actions";
import { isFetchingSelector, todosSelector, todoSelector } from "../selectors";

export const useTodoStore = () => {
  const dispatch: AppDispatch = useDispatch();
  const isFetching = useSelector(isFetchingSelector);
  const todos = useSelector(todosSelector);
  const todo = useSelector(todoSelector);

  const fetchAll = useCallback(() => {
    return dispatch(fetchAllTodos()).then(unwrapResult);
  }, [dispatch]);

  const fetch = useCallback(
    (arg: { id: string }) => {
      return dispatch(fetchTodo(arg)).then(unwrapResult);
    },
    [dispatch]
  );

  return {
    isFetching,
    todos,
    todo,
    fetchAll,
    fetch,
  };
};
