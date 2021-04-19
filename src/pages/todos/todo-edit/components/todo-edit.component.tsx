import React from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

import { Todo } from "@prisma/client";

export type TodoUpdateDto = Pick<Todo, "title" | "completed">;

type Props = {
  todo: Todo | null;
  submit(data: TodoUpdateDto): Promise<void>;
};

export const TodoEdit: React.FC<Props> = (props) => {
  const { todo, submit } = props;
  const { register, handleSubmit, errors, reset } = useForm<TodoUpdateDto>({
    defaultValues: {
      ...todo,
    },
  });
  const onSubmit = (data: TodoUpdateDto) => submit(data);

  useEffect(() => {
    reset({ ...todo });
  }, [todo, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
        実行済：
        <input
          name="completed"
          aria-label="completed-input"
          ref={register()}
          type="checkbox"
        />
      </p>

      <p>
        <input type="submit" value="送信" />
      </p>
    </form>
  );
};
