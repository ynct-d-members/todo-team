import * as React from "react";
import { cleanup, render } from "@testing-library/react";

import { Todo } from "@prisma/client";

import { TodoDetail } from "./todo-detail.component";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";

jest.mock("@/libs");
type Props = {
  todo: Todo;
  deleteFunc: (id: number) => Promise<void>;
};

describe("todo-detail.component.tsx", () => {
  afterEach(() => {
    cleanup();
  });

  it("render", () => {
    const history = createMemoryHistory();
    const props: Props = {
      todo: {
        id: 1,
        title: "test",
        completed: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      deleteFunc: jest.fn(),
    };

    const { asFragment } = render(
      <Router history={history}>
        <TodoDetail
          todo={props.todo}
          deleteFunc={() => props.deleteFunc(props.todo.id)}
        />
      </Router>
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
