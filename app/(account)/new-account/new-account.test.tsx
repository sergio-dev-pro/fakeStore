import { fireEvent, getByText, render, screen } from "@testing-library/react";
import { LABEL } from "@/consts/newAccountPage";
import NewAccount from "./page";
import { ERROR_MESSAGE } from "@/consts/validation";

describe("Test new-account page", () => {
  test("username input", () => {
    render(<NewAccount />);

    const usernameInput = screen.getByLabelText(LABEL.USER_NAME);
    const submitButton = screen.getByText<HTMLButtonElement>("Criar");

    // Input mostra erro se tiver menos de 3 caracteres
    fireEvent.change(usernameInput, { target: { value: "" } });
    fireEvent.click(submitButton);
    expect(screen.getByText(ERROR_MESSAGE.USER_NAME)).toBeInTheDocument();

    // Input mostra erro se tiver espaços em branco
    fireEvent.change(usernameInput, { target: { value: "Bob " } });
    fireEvent.click(submitButton);
    expect(screen.getByText(ERROR_MESSAGE.USER_NAME)).toBeInTheDocument();

    // Input mostra erro se tiver mais de 20 caracteres
    fireEvent.change(usernameInput, {
      target: { value: "BobBobBobBobBobBobBob" },
    });
    fireEvent.click(submitButton);
    expect(screen.getByText(ERROR_MESSAGE.USER_NAME)).toBeInTheDocument();

    // Input não mostra erro
    fireEvent.change(usernameInput, { target: { value: "Bob_10" } });
    fireEvent.click(submitButton);
    expect(screen.queryByText(ERROR_MESSAGE.USER_NAME)).not.toBeInTheDocument();
  });
  test("phone input", () => {
    render(<NewAccount />);

    // Formata o valor de entrada
    const phoneInput: HTMLInputElement = screen.getByLabelText(LABEL.PHONE);
    fireEvent.change(phoneInput, { target: { value: "99999999999" } });
    expect(phoneInput.value).toBe("99 9 9999-9999");

    // Mostra mensagem de erro se numero não tiver 11 digitos ou o 9 depois do DDD
    fireEvent.change(phoneInput, { target: { value: "10299999999" } });
    const submitButton = screen.getByText<HTMLButtonElement>("Criar");
    fireEvent.click(submitButton);
    expect(screen.queryByText(ERROR_MESSAGE.PHONE.INVALID)).toBeInTheDocument();
    // Mostra mensagem de erro se DDD inválido
    fireEvent.change(phoneInput, { target: { value: "10992882109" } });
    fireEvent.click(submitButton);
    expect(
      screen.queryByText(ERROR_MESSAGE.PHONE.INVALID_DDD)
    ).toBeInTheDocument();
  });
  test("zipcode input", () => {
    render(<NewAccount />);

    // Formata o valor de entrada
    const zipcodeInput: HTMLInputElement = screen.getByLabelText(LABEL.CEP);
    fireEvent.change(zipcodeInput, { target: { value: "99999999" } });
    expect(zipcodeInput.value).toBe("99999-999");

    // Mostra mensagem de erro se CEP não tiver 8 digitos
    fireEvent.change(zipcodeInput, { target: { value: "1234567" } });
    const submitButton = screen.getByText<HTMLButtonElement>("Criar");
    fireEvent.click(submitButton);
    expect(screen.getByText(ERROR_MESSAGE.ZIPCODE)).toBeInTheDocument();

    // Não Mostra mensagem de erro se CEP tiver 8 digitos
    fireEvent.change(zipcodeInput, { target: { value: "12345678" } });
    fireEvent.click(submitButton);
    expect(screen.queryByText(ERROR_MESSAGE.ZIPCODE)).not.toBeInTheDocument();
  });
});
