import { fireEvent, render, screen } from "@testing-library/react";
import Login, {
  BUTTON_LABEL,
  NAME_ERROR_MSG,
  NAME_INPUT_LABEL,
  PASSWORD_ERROR_MSG,
  PASSWORD_INPUT_LABEL,
  VALID_NAME,
  VALID_PASSWORD,
} from "./page";

describe("Test Signin page", () => {
  test("name input", () => {
    render(<Login />);

    const nameInput = screen.getByLabelText(NAME_INPUT_LABEL);
    fireEvent.change(nameInput, { target: { value: "Bob" } });

    const submitButton = screen.getByText<HTMLButtonElement>(BUTTON_LABEL);
    fireEvent.click(submitButton);

    screen.getByText(NAME_ERROR_MSG);

    fireEvent.change(nameInput, { target: { value: VALID_NAME } });

    fireEvent.click(submitButton);

    expect(screen.queryByText(NAME_ERROR_MSG)).toBeNull();
  });
  test("password input", () => {
    render(<Login />);

    const passInput: HTMLInputElement =
      screen.getByLabelText(PASSWORD_INPUT_LABEL);
    fireEvent.change(passInput, { target: { value: "Password" } });

    const submitButton = screen.getByText<HTMLButtonElement>(BUTTON_LABEL);
    fireEvent.click(submitButton);

    screen.getByText(PASSWORD_ERROR_MSG);

    fireEvent.change(passInput, { target: { value: VALID_PASSWORD } });

    fireEvent.click(submitButton);
    expect(screen.queryByText(PASSWORD_ERROR_MSG)).toBeNull();
  });
});
