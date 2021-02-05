import { FastifyInstance } from "fastify";
import { TodoRoutes } from "./modules/todo/todo.routes";

// ルーティングをまとめてくれる関数
export function Router(server: FastifyInstance): void {
  const todoRoutes = new TodoRoutes();
  server.register(todoRoutes.initRoutes);
}
