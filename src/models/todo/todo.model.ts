import { Todo } from "@prisma/client";

export type TodoCreateDto = Pick<Todo, "title">;
export type TodoUpdateDto = Pick<Todo, "title" | "completed">;

export type { Todo } from "@prisma/client";
