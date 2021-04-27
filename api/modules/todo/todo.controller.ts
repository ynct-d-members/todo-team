import { FastifyReply, FastifyRequest, RouteShorthandOptions } from "fastify";
import {
  Controller,
  DELETE,
  ErrorHandler,
  GET,
  Inject,
  PATCH,
  POST,
} from "fastify-decorators";
import { TodoService } from "./todo.service";
import { Todo, Prisma } from "@prisma/client";

const ErrorType = {
  GENERIC: "GENERIC",
  TODO_NOT_FOUND: "TODO_NOT_FOUND",
  REQUEST_VALIDATION_ERROR: "REQUEST_VALIDATION_ERROR",
  TYPE: "TYPE",
  SYNTAX: "SYNTAX",
} as const;

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
  @Inject(TodoService)
  protected todoService!: TodoService;

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
    const { id } = request.params;
    const todo: Todo | null = await this.todoService.getTodo(
      Number.parseInt(id)
    );
    if (todo === null) {
      throw { code: ErrorType.TODO_NOT_FOUND };
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
      throw { code: ErrorType.REQUEST_VALIDATION_ERROR };
    }
    const { title } = request.body;
    const todo = await todoService.createTodo(title);
    reply.code(200).send(todo);
  }

  @PATCH("/todos/:id", updateTodoOpts)
  public async updateTodoHandler(
    request: FastifyRequest<IUpdateRequest>,
    reply: FastifyReply
  ) {
    const { id } = request.params;
    const { title } = request.body;
    const todo = await this.todoService.updateTodo(Number.parseInt(id), title);
    if (todo === null) {
      throw { code: ErrorType.TODO_NOT_FOUND };
    } else {
      reply.code(200).send(todo);
    }
  }

  @DELETE("/todos/:id")
  public async deleteTodoHandler(
    request: FastifyRequest<IDeleteRequest>,
    reply: FastifyReply
  ) {
    const { id } = request.params;
    const serviceResponse = await this.todoService.deleteTodo(
      Number.parseInt(id)
    );

    if (serviceResponse instanceof Prisma.PrismaClientKnownRequestError) {
      const code = serviceResponse.code;
      if (code === "P2001") {
        throw { code: ErrorType.TODO_NOT_FOUND };
      }
    } else {
      reply.code(204).send({ id: serviceResponse.id });
    }
  }

  @ErrorHandler(ErrorType.TODO_NOT_FOUND)
  notFoundErrorHandler(
    error: Error,
    request: FastifyRequest,
    reply: FastifyReply
  ) {
    reply.status(404).send({
      message: "Todo Not Found",
    });
  }

  @ErrorHandler(ErrorType.REQUEST_VALIDATION_ERROR)
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
