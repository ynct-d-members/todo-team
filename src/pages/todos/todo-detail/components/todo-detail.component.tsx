import React from "react";
import { todos } from "../../todo-mock";
import { date } from "../../../../libs";

type TodoDetailProps = {
  id: number;
};

export const TodoDetail: React.FC<TodoDetailProps> = (props) => {
  const todo = todos.find((t) => t.id === props.id);
  return todo ? (
    <>
      <table>
        <tbody>
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
            <td>{date.format(todo.createdAt, "YYYY/MM/DD HH:mm:ss")}</td>
          </tr>
          <tr>
            <td>更新日</td>
            <td>{date.format(todo.updatedAt, "YYYY/MM/DD HH:mm:ss")}</td>
          </tr>
        </tbody>
      </table>
    </>
  ) : (
    <div>todo not found</div>
  );
};
