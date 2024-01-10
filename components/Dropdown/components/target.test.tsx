import React from "react";
import { render, fireEvent, getByText, screen } from "@testing-library/react";
import { Context, ContextT } from "../context";
import { Target, TARGET_KEY } from "./Target";

const toggleShowingMock = jest.fn();
const contextValues: ContextT = {
  isShowing: false,
  toggleShowing: toggleShowingMock,
};

describe("Target Component", () => {
  it("toggles showing on click", () => {
    render(
      <Context.Provider value={contextValues}>
        <Target>Target</Target>
      </Context.Provider>
    );

    const targetElement = screen.getByText("Target");
    fireEvent.click(targetElement);

    expect(toggleShowingMock).toHaveBeenCalledTimes(1);
  });
});
