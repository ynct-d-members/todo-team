import * as React from "react";
import { useForm } from "react-hook-form";

export type AuthCreateDto = {
  user: string;
  password: string;
};

type Props = {
  onBasicLogin: (data: AuthCreateDto) => Promise<void>;
};

export const AuthComponent: React.FC<Props> = (props) => {
  const { register, handleSubmit } = useForm<AuthCreateDto>();
  const onSubmit = (data: AuthCreateDto) => props.onBasicLogin(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1>Login Page</h1>
      <div>
        <label>Username</label>
        <input
          name="user"
          type="text"
          placeholder="Username"
          ref={register({ required: true })}
        />
      </div>
      <div>
        <label>Password</label>
        <input
          name="password"
          type="password"
          placeholder="********"
          ref={register({ required: true })}
        />
      </div>
      <p>
        <input type="submit" value="Login" />
      </p>
    </form>
  );
};
