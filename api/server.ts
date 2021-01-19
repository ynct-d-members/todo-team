import Fastify, { FastifyInstance, RouteShorthandOptions } from "fastify";
import { Server, IncomingMessage, ServerResponse } from "http";
import { todos } from "../src/pages/todos/todo-mock";
import { Todo } from "@prisma/client";

const server = Fastify();

//handles GET / request
server.get("/", async (request, reply) => {
  try {
    return { message: "hello, world!" };
  } catch (e) {
    console.log(e);
  }
});

interface ITodoParameters {
  id: string;
}

server.get<{ Params: ITodoParameters }>("/todo/:id", async (request, reply) => {
  const { id } = request.params;
  const todo: Todo | undefined = todos.find(
    (todo) => todo.id === Number.parseInt(id)
  );

  if (todo === undefined) {
    reply.code(404).send({ message: "Specified todo is undefined" });
  } else {
    reply.code(200).send(todo);
  }
});

//iterating over all the routes and registering them with fastify
// routes.forEach(route => server.route(route))

//launching server at port : 3000 in local environment
server.listen(process.env.PORT || 3010, "0.0.0.0", (err) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`server running at ${server.server.address()}`);
});
