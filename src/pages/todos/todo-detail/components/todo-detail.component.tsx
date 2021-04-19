import React from "react";
import { date } from "@/libs";
import { Todo } from "@prisma/client";
import { NavLink } from "react-router-dom";

type TodoDetailProps = {
  todo: Todo | null;
  deleteFunc: (id: number) => Promise<void>;
};

export const TodoDetail: React.FC<TodoDetailProps> = (props) => {
  const { todo } = props;
  return (
    <>
      {todo ? (
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
          <NavLink to={`/todos/edit/${todo.id}`}>編集する</NavLink>
          <button onClick={() => props.deleteFunc(todo.id)}>削除する</button>
        </>
      ) : (
        <>loading...</>
      )}
    </>
  );
};
