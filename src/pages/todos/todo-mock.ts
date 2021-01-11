import dayjs from "dayjs";
import { Todo } from "@prisma/client";

export const todos: Todo[] = [
  {
    id: 1,
    title: "testTodo1",
    createdAt: dayjs().format("YYYY/MM/DD HH:mm:ss"),
    updatedAt: dayjs().format("YYYY/MM/DD HH:mm:ss"),
  },
];
