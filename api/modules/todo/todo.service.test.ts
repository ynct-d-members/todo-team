/**
 * @jest-environment ./api/modules/todo/prisma-test-environment.js
 */
import { TodoService } from "./todo.service";
test("TestTodoという名前のTodoを作成できる", async () => {
  const service = new TodoService();
  const todo = await service.createTodo("TestTodo");
  expect(todo.title).toMatch("TestTodo");
});
