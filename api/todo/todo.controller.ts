import Fastify, { FastifyReply, FastifyRequest } from "fastify";
import { TodoService } from "./todo.service";
import { Todo } from "@prisma/client";

interface ITodoDetailRequest {
  Params: {
    id: string;
  };
}

export class TodoController {
  todoService: TodoService;

  constructor() {
    this.todoService = new TodoService();
  }
  // todos list
  public getTodosListHandler(request: FastifyRequest, reply: FastifyReply) {
    reply.header("Content-Type", "application/json").code(200);
    reply.send(this.todoService.getTodosList());
  }

  // lookup todo by id
  public getTodoDetailHandler(
    request: FastifyRequest<ITodoDetailRequest>,
    reply: FastifyReply
  ) {
    reply.header("Content-Type", "application/json").code(200);
    const { id } = request.params;
    const todo: Todo | undefined = this.todoService.getTodo(
      Number.parseInt(id)
    );
    if (todo === undefined) {
      reply.code(404).send({ message: "todo not found" });
    } else {
      reply.code(200).send(todo);
    }
  }
}
