import { Todo } from "@prisma/client";

export const initialState: Todo = {
  id: 0,
  title: "",
  createdAt: new Date(),
  updatedAt: new Date(),
  completed: false,
};
