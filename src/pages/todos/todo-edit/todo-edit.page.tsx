import React from "react";
import { useParams } from "react-router-dom";

import { TodoEditContainer } from "./containers";

type RouterParams = {
  id: string;
};

export const TodoEditPage: React.FC = () => {
  const { id } = useParams<RouterParams>();

  return <TodoEditContainer id={id} />;
};
