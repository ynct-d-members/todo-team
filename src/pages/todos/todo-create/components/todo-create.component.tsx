import React from "react";
import { useForm } from "react-hook-form";

import { Todo } from "@prisma/client";

export type TodoCreateDto = Pick<Todo, "title">;
type Props = {
  submit(data: TodoCreateDto): Promise<void>;
};

const formStyle: React.CSSProperties = {
  textAlign: "start",
};

export const TodoCreate: React.FC<Props> = (props) => {
  const { register, handleSubmit, errors } = useForm<TodoCreateDto>();
  const onSubmit = (data: TodoCreateDto) => props.submit(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={formStyle}>
      <p>
        タイトル：
        <input
          name="title"
          aria-label="title-input"
          ref={register({ required: true })}
        />
        {errors.title && errors.title.type && (
          <span aria-label="required-error">Required</span>
        )}
      </p>

      <p>
        <input type="submit" value="送信" />
      </p>
    </form>
  );
};
