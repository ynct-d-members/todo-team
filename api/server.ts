import Fastify, {
  FastifyRequest,
  FastifyReply,
  RouteHandlerMethod,
} from "fastify";
import fastifyCors from "fastify-cors";
import { Router } from "./router";

const server = Fastify({ logger: true });

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

    server.addHook("onRequest", (request, reply, done) => {
      reply.header("Content-Type", "application/json");
      done();
    });

    server.get("/", this.getHelloHandler);
    Router(server);

    //launching server at port : 3000 in local environment
    server
      .listen(process.env.PORT || 3010, "0.0.0.0")
      .then((address) => console.log(`server listening on ${address}`))
      .catch((err) => {
        console.log(err);
        process.exit(1);
      });
  }

  getHelloHandler: RouteHandlerMethod = (
    request: FastifyRequest,
    reply: FastifyReply
  ) => {
    reply.code(200).send({ hello: "world" });
  };
}
new REST();
