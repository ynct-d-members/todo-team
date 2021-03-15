/**
 * @jest-environment ./api/modules/todo/prisma-test-environment.js
 */
import { TodoService } from "./todo.service";
const service = new TodoService();
afterAll(async () => {
  await service.closeDatabase();
});

test("TestTodoという名前のTodoを作成できる", async () => {
  const todo = await service.createTodo("TestTodo");
  expect(todo.title).toMatch("TestTodo");
});
