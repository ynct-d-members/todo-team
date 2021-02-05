import { PrismaClient } from "@prisma/client";

export default class Service {
  protected readonly client: PrismaClient;
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
          emit: "stdout",
          level: "info",
        },
        {
          emit: "stdout",
          level: "warn",
        },
      ],
    });
  }
}
