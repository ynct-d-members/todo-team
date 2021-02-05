import React from "react";
import { useForm } from "react-hook-form";

import { Todo } from "@prisma/client";

type TodoCreateDto = Pick<Todo, "title">;

const formStyle: React.CSSProperties = {
  textAlign: "start",
};

export const TodoCreate: React.FC = () => {
  const { register, handleSubmit, errors } = useForm<TodoCreateDto>();
  const onSubmit = (data: TodoCreateDto) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={formStyle}>
      <p>
        タイトル：
        <input name="title" ref={register({ required: true })} />
        {errors.title && errors.title.type && <span>Required</span>}
      </p>

      <p>
        <input type="submit" value="送信" />
      </p>
    </form>
  );
};
