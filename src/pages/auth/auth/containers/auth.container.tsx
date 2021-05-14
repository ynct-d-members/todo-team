import * as React from "react";
import { useHistory } from "react-router-dom";

import { http } from "@/libs";
import { AuthComponent, AuthCreateDto } from "../components";

export const AuthContainer: React.FC = () => {
  const history = useHistory();
  const onBasicLogin = async (data: AuthCreateDto) => {
    await http.post("/login", data).then(() => {
      history.push("/todos");
    });
  };
  return <AuthComponent onBasicLogin={onBasicLogin} />;
};
