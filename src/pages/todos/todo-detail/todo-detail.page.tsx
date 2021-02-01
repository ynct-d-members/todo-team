import * as React from "react";
import { useParams } from "react-router-dom";

import { TodoDetailContainer } from "./containers";

interface RouterParams {
  id: string;
}

const toId = (id: string): number => {
  return Number(id);
};

export const TodoDetailPage: React.FC = () => {
  const { id } = useParams<RouterParams>();

  return <TodoDetailContainer id={toId(id)} />;
};
