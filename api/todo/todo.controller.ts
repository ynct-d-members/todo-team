import { FastifyReply, FastifyRequest } from "fastify";
import { TodoService } from "./todo.service";
import { Todo } from "@prisma/client";

interface ITodoDetailRequest {
  Params: {
    id: string;
  };
}

export class TodoController {
  // todos list
  public getTodosListHandler(request: FastifyRequest, reply: FastifyReply) {
    const todoService = new TodoService();
    reply.header("Content-Type", "application/json").code(200);
    reply.send(todoService.getTodosList());
  }

  // lookup todo by id
  public getTodoDetailHandler(
    request: FastifyRequest<ITodoDetailRequest>,
    reply: FastifyReply
  ) {
    const todoService = new TodoService();

    reply.header("Content-Type", "application/json").code(200);
    const { id } = request.params;
    const todo: Todo | undefined = todoService.getTodo(Number.parseInt(id));
    if (todo === undefined) {
      reply.code(404).send({ message: "todo not found" });
    } else {
      reply.code(200).send(todo);
    }
  }
}
