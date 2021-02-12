import { Todo } from "@prisma/client";
import { BaseService } from "../../common";

export class TodoService extends BaseService {
  public async getTodosList(): Promise<Todo[] | null> {
    return await this.client.todo.findMany();
  }

  public async getTodo(id: number): Promise<Todo | null> {
    const todo: Promise<Todo | null> = this.client.todo
      .findUnique({
        where: {
          id: id,
        },
      })
      .then((res) => res);

    return todo;
  }

  public async createTodo(title: string) {
    try {
      const newtodo = await this.client.todo.create({
        data: {
          title: title,
        },
      });
      return newtodo;
    } catch (e) {
      console.error(e);
    }
  }

  public async updateTodo(id: number, title: string | undefined) {
    try {
      const newtodo = await this.client.todo.update({
        where: {
          id: id,
        },
        data: {
          title: title != null ? title : undefined,
        },
      });

      return newtodo;
    } catch (e) {
      console.error(e);
    }
  }
}
