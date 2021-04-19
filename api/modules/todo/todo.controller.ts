import fastify, {
  FastifyReply,
  FastifyRequest,
  RouteShorthandOptions,
} from "fastify";
import {
  Controller,
  DELETE,
  ErrorHandler,
  GET,
  PATCH,
  POST,
} from "fastify-decorators";
import { TodoService } from "./todo.service";
import { Todo, Prisma } from "@prisma/client";

const enum ErrorType {
  GENERIC,
  NOTFOUND,
  TYPE,
  SYNTAX,
}

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

const getTodoDetailOpts: RouteShorthandOptions = {
  schema: {
    response: {
      200: {
        type: "object",
        properties: {
          id: { type: "number" },
          title: { type: "string" },
        },
      },
      400: {
        type: "object",
        properties: {
          message: { type: "string" },
        },
      },
    },
  },
  attachValidation: true,
};

const createTodoOpts: RouteShorthandOptions = {
  schema: {
    body: {
      type: "object",
      properties: {
        title: { type: "string" },
      },
      required: ["title"],
    },
  },
  attachValidation: true,
};

const updateTodoOpts: RouteShorthandOptions = {
  schema: {
    body: {
      type: "object",
      properties: {
        title: { type: "string" },
      },
    },
  },
  attachValidation: true,
};

@Controller({
  route: "/",
})
export class TodoController {
  protected todoService: TodoService;
  constructor() {
    this.todoService = new TodoService();
  }

  @GET("/todos")
  public async getTodosListHandler(_: FastifyRequest, reply: FastifyReply) {
    reply.send(await this.todoService.getTodosList());
  }

  // lookup todo by id
  @GET("/todos/:id", getTodoDetailOpts)
  public async getTodoDetailHandler(
    request: FastifyRequest<ITodoDetailRequest>,
    reply: FastifyReply
  ) {
    const todoService = new TodoService();
    const { id } = request.params;
    const todo: Todo | null = await todoService.getTodo(Number.parseInt(id));
    if (todo === null) {
      throw { code: "TODO_NOTFOUND" };
    } else {
      reply.code(200).send(todo);
    }
  }

  @POST("/todos/new", createTodoOpts)
  public async createTodoHandler(
    request: FastifyRequest<ICreateRequest>,
    reply: FastifyReply
  ) {
    const todoService = new TodoService();
    if (request.validationError) {
      throw { code: "REQUEST_VALIDATION_ERROR" };
    }
    const { title } = request.body;
    const todo = await todoService.createTodo(title);
    reply.code(200).send(todo);
  }

  @PATCH("/todos/update/:id", updateTodoOpts)
  public async updateTodoHandler(
    request: FastifyRequest<IUpdateRequest>,
    reply: FastifyReply
  ) {
    const todoService = new TodoService();
    const { id } = request.params;
    const { title } = request.body;
    const todo = await todoService.updateTodo(Number.parseInt(id), title);
    if (todo === null) {
      throw { code: "TODO_NOTFOUND" };
    } else {
      reply.code(200).send(todo);
    }
  }

  @DELETE("/todos/delete/:id")
  public async deleteTodoHandler(
    request: FastifyRequest<IDeleteRequest>,
    reply: FastifyReply
  ) {
    const todoService = new TodoService();
    const { id } = request.params;
    const serviceResponse = await todoService.deleteTodo(Number.parseInt(id));

    if (serviceResponse instanceof Prisma.PrismaClientKnownRequestError) {
      reply.code(404).send({ message: serviceResponse });
    } else {
      reply.code(200).send(serviceResponse);
    }
  }

  @ErrorHandler("TODO_NOTFOUND")
  notFoundErrorHandler(
    error: Error,
    request: FastifyRequest,
    reply: FastifyReply
  ) {
    reply.status(404).send({
      message: "Todo Not Found",
    });
  }

  @ErrorHandler("REQUEST_VALIDATION_ERROR")
  validationErrorHandler(
    error: Error,
    request: FastifyRequest,
    reply: FastifyReply
  ) {
    reply.code(400).send(request.validationError);
  }

  @ErrorHandler()
  genericErrorHandler(
    error: Error,
    request: FastifyRequest,
    reply: FastifyReply
  ) {
    reply.status(500).send(error.message);
  }
}
