import React from "react";
import { render, screen } from "@testing-library/react";
import { Context } from "../context";
import { Content } from "./Content";

describe("Content Component", () => {
  it("renders content when isShowing is true", () => {
    const contextValues = {
      isShowing: true,
      toggleShowing: jest.fn(),
    };
    render(
      <Context.Provider value={contextValues}>
        <Content>Content</Content>
      </Context.Provider>
    );
    screen.getByText(/Content/i);
  });

  it("The classname property is passed to div", () => {
    const contextValues = {
      isShowing: true,
      toggleShowing: jest.fn(),
    };
    render(
      <Context.Provider value={contextValues}>
        <Content className="class">Content</Content>
      </Context.Provider>
    );
    const contentElement = screen.getByText(/Content/i);
    expect(contentElement.className).toBe("dropdown__content class");
  });

  it("does not render content when isShowing is false", () => {
    const contextValues = {
      isShowing: false,
      toggleShowing: jest.fn(),
    };

    render(
      <Context.Provider value={contextValues}>
        <Content>Content</Content>
      </Context.Provider>
    );

    const contentElement = screen.queryByText(/Content/i);
    expect(contentElement).toBeNull();
  });
});
