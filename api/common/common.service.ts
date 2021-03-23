import { Prisma, PrismaClient } from "@prisma/client";

export class BaseService {
  protected client: PrismaClient<Prisma.PrismaClientOptions, "info">;
  constructor() {
    this.client = new PrismaClient({
      log: [
        {
          emit: "event",
          level: "query",
        },
        {
          emit: "stdout",
          level: "error",
        },
        {
          emit: "event",
          level: "info",
        },
        {
          emit: "stdout",
          level: "warn",
        },
      ],
    });
    this.client.$on("info", (e) => console.log(e));
  }

  async closeDatabase() {
    await this.client.$disconnect();
  }
}
