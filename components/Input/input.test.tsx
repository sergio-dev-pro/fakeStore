import { fireEvent, render, screen } from "@testing-library/react";
import { Input } from "./Input";
import React from "react";

describe("Input component", () => {
  it("label is rendered", () => {
    render(<Input label="Test" />);
    const labelElement = screen.getByText("Test");
    expect(labelElement.tagName).toBe("LABEL");
  });
  it("onChange event", () => {
    const handleChange = jest.fn();
    render(<Input label="test" onChange={handleChange} />);
    const input: HTMLInputElement = screen.getByLabelText("test");
    fireEvent.change(input, { target: { value: "1" } });
    expect(handleChange.mock.lastCall[0]["target"]["value"]).toBe("1");
  });
  it("show error message", () => {
    const message = "Invalid input";
    render(<Input label="test" errorMessage={message} />);
    const span: HTMLSpanElement = screen.getByText(message);
    expect(span.tagName).toBe("SPAN");
  });
  it("do not render span for error message if errorMessage prop is not passed", () => {
    const message = "";
    const { container } = render(<Input label="test" errorMessage={message} />);
    const span = container.querySelector("span");
    expect(span).toBeNull();
  });
});
