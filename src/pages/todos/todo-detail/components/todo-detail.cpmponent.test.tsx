import * as React from "react";
import { cleanup, render } from "@testing-library/react";

import { Todo } from "@prisma/client";

import { TodoDetail } from "./todo-detail.component";

jest.mock("../../../../libs");
type Props = {
  todo: Todo;
  deleteFunc: (id: number) => Promise<void>;
};

describe("todo-detail.component.tsx", () => {
  afterEach(() => {
    cleanup();
  });

  it("render", () => {
    const props: Props = {
      todo: {
        id: 1,
        title: "test",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      deleteFunc: jest.fn(),
    };

    const { asFragment } = render(
      <TodoDetail
        todo={props.todo}
        deleteFunc={() => props.deleteFunc(props.todo.id)}
      />
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
