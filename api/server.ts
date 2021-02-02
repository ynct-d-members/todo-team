import Fastify from "fastify";
import { todos } from "../src/pages/todos/todo-mock";
import { Todo } from "@prisma/client";
import fastifyCors from "fastify-cors";
import { root } from "./routes/root";

const server = Fastify();

class REST {
  constructor() {
    this.init();
  }

  init(): void {
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

    server.get("/", this.getHelloHandler);

    //launching server at port : 3000 in local environment
    server.listen(process.env.PORT || 3010, "0.0.0.0", (err) => {
      if (err) {
        console.error(err);
        process.exit(1);
      }
      console.log(`server running at ${server.server.address()}`);
    });
  }

  getHelloHandler(req: any, reply: any) {
    reply.header("Content-Type", "application/json").code(200);
    reply.send({ hello: "world" });
  }
}
new REST();

interface ITodoParameters {
  id: string;
}

// todos list
server.get("/todo/", async (request, reply) => {
  reply.code(200).send(todos);
});

//iterating over all the routes and registering them with fastify
// routes.forEach(route => server.route(route))
