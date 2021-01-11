import { prependOnceListener } from "process";
import React from "react";
import { todos } from "../../todo-mock";

type TodoDetailProps = {
  id: number;
};

const TodoDetail: React.FC<TodoDetailProps> = (props) => {
  const todo = todos.find((t) => t.id === props.id);
  return todo ? (
    <>
      <tr>
        <td>id</td>
        <td>{todo.id}</td>
      </tr>
      <tr>
        <td>タイトル</td>
        <td>{todo.title}</td>
      </tr>
      <tr>
        <td>作成日</td>
        <td>{todo.createdAt}</td>
      </tr>
      <tr>
        <td>更新日</td>
        <td>{todo.updatedAt}</td>
      </tr>
    </>
  ) : (
    <div>todo not found</div>
  );
};

export default TodoDetail;
