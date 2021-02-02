import { Todo } from "@prisma/client";
import { todos } from "../../src/pages/todos/todo-mock";

export class TodoService {
  public getTodosList(): Todo[] {
    return todos;
  }

  public getTodo(id: number): Todo | undefined {
    const todo: Todo | undefined = todos.find((todo) => todo.id === id);

    return todo;
  }
}
