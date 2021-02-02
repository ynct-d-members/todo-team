import * as React from "react";
import { cleanup, render } from "@testing-library/react";

import { Todo } from "@prisma/client";

import { TodoDetail } from "./todo-detail.component";

jest.mock("../../../../libs");

describe("todo-detail.component.tsx", () => {
  afterEach(() => {
    cleanup();
  });

  it("render", () => {
    const props: Todo = {
      id: 1,
      title: "test",
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const { asFragment } = render(<TodoDetail todo={props} />);

    expect(asFragment()).toMatchSnapshot();
  });
});
