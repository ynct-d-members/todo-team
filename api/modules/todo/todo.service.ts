import { Todo } from "@prisma/client";
import { BaseService } from "../../common";
import { todos } from "../../mocks/todo-mock";

export class TodoService extends BaseService {
  public getTodosList(): Todo[] {
    return todos;
  }

  public getTodo(id: number): Todo | undefined {
    const todo: Todo | undefined = todos.find((todo) => todo.id === id);

    return todo;
  }

  public async createTodo(title: string) {
    const prisma = this.client;
    try {
      const newtodo = await prisma.todo.create({
        data: {
          title: title,
        },
      });
      return newtodo;
    } catch (e) {
      console.error(e);
    }
  }
}
