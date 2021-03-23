import { unwrapResult } from "@reduxjs/toolkit";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import { AppDispatch } from "../../store";
import { fetchAllTodos } from "../actions";
import { isFetchingSelector, todosSelector } from "../selectors";

export const useTodoStore = () => {
  const dispatch: AppDispatch = useDispatch();
  const isFetching = useSelector(isFetchingSelector);
  const todos = useSelector(todosSelector);

  const fetchAll = useCallback(() => {
    return dispatch(fetchAllTodos()).then(unwrapResult);
  }, [dispatch]);

  return {
    isFetching,
    todos,
    fetchAll,
  };
};
