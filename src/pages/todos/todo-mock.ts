import dayjs from "dayjs";
import { ITodo } from "./todo";

export const todos: ITodo[] = [
  {
    id: 1,
    title: "testTodo1",
    createdAt: dayjs().format("YYYY/MM/DD HH:mm:ss"),
    updatedAt: dayjs().format("YYYY/MM/DD HH:mm:ss"),
  },
];
