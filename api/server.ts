import Fastify from "fastify";
import { todos } from "./mocks/todo-mock";
import { Todo } from "@prisma/client";
import fastifyCors from "fastify-cors";

const server = Fastify();

// Cors対策
// localhostからの通信は許可し，それ以外は遮断
server.register(fastifyCors, {
  origin: (origin, cb) => {
    if (/localhost/.test(origin)) {
      // Request from localhost will pass
      cb(null, true);
      return;
    }
    // Generate an error on other origins, disabling access
    cb(new Error("Not allowed"), false);
  },
});

//handles GET / request
server.get("/", async (request, reply) => {
  return { message: "hello, world!" };
});

interface ITodoParameters {
  id: string;
}

// lookup todo by id
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

// todos list
server.get("/todo/", async (request, reply) => {
  reply.code(200).send(todos);
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
