import Fastify from "fastify";
import fastifyCors from "fastify-cors";
import { Router } from "./router";

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
    Router(server);

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
