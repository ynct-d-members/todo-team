import { Todo } from "@prisma/client";

export const todos: Todo[] = [
  {
    id: 1,
    title: "testTodo1",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];
