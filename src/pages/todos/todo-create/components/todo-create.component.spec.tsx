import * as React from "react";
import { cleanup, fireEvent, render } from "@testing-library/react";

import { TodoCreate } from "./todo-create.component";

describe("todo-create.component.tsx", () => {
  const setup = () => {
    const utils = render(<TodoCreate />);
    const inputTitle = utils.getByLabelText("title-input") as HTMLInputElement;
    const submit = utils.getByDisplayValue("送信") as HTMLInputElement;
    return {
      inputTitle,
      submit,
      utils,
    };
  };

  afterEach(() => {
    cleanup();
  });

  it("render", () => {
    const { asFragment } = render(<TodoCreate />);

    expect(asFragment()).toMatchSnapshot();
  });

  it("input text", () => {
    const { inputTitle } = setup();
    const inputText = "test";
    fireEvent.change(inputTitle, { target: { value: inputText } });
    expect(inputTitle.value).toBe(inputText);
  });

  it.skip("submit event", () => {
    // TODO: submit eventの発火したかどうかのテスト
  });
});
