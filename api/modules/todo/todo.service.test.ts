/**
 * @jest-environment ./api/modules/todo/prisma-test-environment.js
 */
import { TodoService } from "./todo.service";
const service = new TodoService();
afterAll(async () => {
  await service.closeDatabase();
});

test("TestTodoという名前のTodoを作成できる", async () => {
  const todoName = "TestTodo";
  const todo = await service.createTodo(todoName);
  expect(todo.title).toMatch(todoName);
});

test("存在しない番号のTodoを取り出そうとするとnullが返ってくる", async () => {
  const todo = await service.getTodo(2);
  expect(todo).toBeNull();
});
