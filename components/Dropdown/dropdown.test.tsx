import { fireEvent, render, screen } from "@testing-library/react";
import { Dropdown } from "./Dropdown";

test("Dropdown test", () => {
  const title = "Test";
  const children = "visible dropdown";
  render(<Dropdown title="Test">{children}</Dropdown>);

  const dropdownButton = screen.getByText<HTMLButtonElement>(title);
  expect(dropdownButton).toBeInTheDocument();

  expect(screen.queryByText(children)).not.toBeInTheDocument();

  fireEvent.click(dropdownButton);
  expect(screen.queryByText(children)).toBeInTheDocument();

  fireEvent.click(dropdownButton);
  expect(screen.queryByText(children)).not.toBeInTheDocument();

  fireEvent.click(dropdownButton);
  expect(screen.queryByText(children)).toBeInTheDocument();

  const dropdownContainer = screen.getByTestId("container");
  fireEvent.mouseLeave(dropdownContainer);
  expect(screen.queryByText(children)).not.toBeInTheDocument();
});
