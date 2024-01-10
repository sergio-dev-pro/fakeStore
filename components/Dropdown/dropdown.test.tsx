import { render, screen } from "@testing-library/react";
import { DROPDOWN_MUST_HAVE_TWO_CHILDREN, Dropdown } from "./Dropdown";

describe("Dropdown component", () => {
  it("renders Dropdown.Target and Dropdown.Content successfully", () => {
    render(
      <Dropdown>
        <Dropdown.Target>Minha conta</Dropdown.Target>
        <Dropdown.Content>Content</Dropdown.Content>
      </Dropdown>
    );
    screen.getByText(/Minha conta/i);
    const contentElement = screen.queryByText(/Content/i);
    expect(contentElement).toBeNull();
  });
  it("The classname property is passed to div", () => {
    const classNames = "my-class my-class2";
    render(
      <Dropdown className={classNames}>
        <Dropdown.Target className={classNames}>Minha conta</Dropdown.Target>
        <Dropdown.Content className={classNames}>Content</Dropdown.Content>
      </Dropdown>
    );
    const dropdownElement = screen.getByTestId("dropdown");
    expect(dropdownElement.className).toBe(`dropdown ${classNames}`);
    const targetElement = screen.getByText(/Minha conta/i);
    expect(targetElement.className).toBe(`dropdown__target ${classNames}`);
  });
  it("exception when Target and Content are not provided as children", () => {
    expect(() =>
      render(
        <Dropdown>
          <div></div>
          <div></div>
        </Dropdown>
      )
    ).toThrow(DROPDOWN_MUST_HAVE_TWO_CHILDREN);
  });
});
