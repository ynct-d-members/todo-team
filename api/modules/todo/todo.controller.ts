import { FastifyReply, FastifyRequest } from "fastify";
import { TodoService } from "./todo.service";
import { Todo } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";

interface ITodoDetailRequest {
  Params: {
    id: string;
  };
}

interface ICreateRequest {
  Body: {
    title: string;
  };
}

interface IUpdateRequest {
  Params: {
    id: string;
  };
  Body: {
    title?: string;
  };
}

interface IDeleteRequest {
  Params: {
    id: string;
  };
}

export class TodoController {
  protected todoService: TodoService = new TodoService();
  // constructor() {
  //   this.todoService = new TodoService();
  // }
  // todos list
  public async getTodosListHandler(
    request: FastifyRequest,
    reply: FastifyReply
  ) {
    const todoService = new TodoService();
    request.log.info("getTodosList");
    reply.send(await todoService.getTodosList());
  }

  // lookup todo by id
  public async getTodoDetailHandler(
    request: FastifyRequest<ITodoDetailRequest>,
    reply: FastifyReply
  ) {
    // const todoService = new TodoService();

    const { id } = request.params;
    const todo: Todo | null = await this.todoService.getTodo(
      Number.parseInt(id)
    );
    if (todo === null) {
      reply.code(404).send({ message: "todo not found" });
    } else {
      reply.code(200).send(todo);
    }
  }

  public async createTodoHandler(
    request: FastifyRequest<ICreateRequest>,
    reply: FastifyReply
  ) {
    const todoService = new TodoService();
    const { title } = request.body;
    const todo = await todoService.createTodo(title);
    reply.code(200).send(todo);
  }

  public async updateTodoHandler(
    request: FastifyRequest<IUpdateRequest>,
    reply: FastifyReply
  ) {
    // const todoService = new TodoService();
    const { id } = request.params;
    const { title } = request.body;
    const todo = await this.todoService.updateTodo(Number.parseInt(id), title);
    if (todo === null) {
      reply.code(400).send({ message: "todo not found" });
    } else {
      reply.code(200).send(todo);
    }
  }

  public async deleteTodoHandler(
    request: FastifyRequest<IDeleteRequest>,
    reply: FastifyReply
  ) {
    // const todoService = new TodoService();
    const { id } = request.params;
    const serviceResponse = await this.todoService.deleteTodo(
      Number.parseInt(id)
    );

    if (serviceResponse instanceof PrismaClientKnownRequestError) {
      reply.code(404).send({ message: serviceResponse });
    } else {
      reply.code(200).send(serviceResponse);
    }
  }
}
