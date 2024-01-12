"use client";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import "./page.scss";
import { ChangeEvent, useState } from "react";

export const VALID_NAME = "mor_2314";
export const NAME_ERROR_MSG = `Nome do usuário deve ser "${VALID_NAME}"`;
export const VALID_PASSWORD = "83r5^_";
export const PASSWORD_ERROR_MSG = `Password deve ser "${VALID_PASSWORD}"`;
export const NAME_INPUT_LABEL = "Nome de usuário";
export const PASSWORD_INPUT_LABEL = "Senha";
export const BUTTON_LABEL = "Pronto";

export default function Login() {
  const [name, setName] = useState({ value: "", isValid: true });
  const [password, setPassword] = useState({ value: "", isValid: true });

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) =>
    setName((state) => ({ ...state, value: e.target.value }));
  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) =>
    setPassword((state) => ({ ...state, value: e.target.value }));

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    // valid name
    const isValidName = name.value === VALID_NAME;
    if (isValidName !== name.isValid)
      setName((state) => ({ ...state, isValid: isValidName }));
    // valid password
    const isValidPassword = password.value === VALID_PASSWORD;
    if (isValidPassword !== password.isValid)
      setPassword((state) => ({ ...state, isValid: isValidPassword }));

    if (!isValidName || !isValidPassword) return;
  };

  const nameErrorMsg = !name.isValid ? NAME_ERROR_MSG : undefined;
  const passwordErrorMsg = !password.isValid ? PASSWORD_ERROR_MSG : undefined;

  return (
    <form className="signin-form">
      <Input
        label={NAME_INPUT_LABEL}
        onChange={handleNameChange}
        errorMessage={nameErrorMsg}
      />
      <Input
        label={PASSWORD_INPUT_LABEL}
        type="password"
        onChange={handlePasswordChange}
        errorMessage={passwordErrorMsg}
      />
      <div className="button-wrapper">
        <Button onClick={handleSubmit}>{BUTTON_LABEL}</Button>
      </div>
    </form>
  );
}
