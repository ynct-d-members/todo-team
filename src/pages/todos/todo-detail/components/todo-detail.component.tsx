import React from "react";
import { date } from "../../../../libs";
import { Todo } from "@prisma/client";

type TodoDetailProps = {
  todo: Todo;
};

export const TodoDetail: React.FC<TodoDetailProps> = (props) => {
  return (
    <>
      <table>
        <tbody>
          <tr>
            <td>id</td>
            <td>{props.todo.id}</td>
          </tr>
          <tr>
            <td>タイトル</td>
            <td>{props.todo.title}</td>
          </tr>
          <tr>
            <td>作成日</td>
            <td>{date.format(props.todo.createdAt, "YYYY/MM/DD HH:mm:ss")}</td>
          </tr>
          <tr>
            <td>更新日</td>
            <td>{date.format(props.todo.updatedAt, "YYYY/MM/DD HH:mm:ss")}</td>
          </tr>
        </tbody>
      </table>
    </>
  );
};
