"use client";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import "./page.scss";
import { ChangeEvent, useState } from "react";
import {
  BUTTON_LABEL,
  NAME_ERROR_MSG,
  NAME_INPUT_LABEL,
  PASSWORD_ERROR_MSG,
  PASSWORD_INPUT_LABEL,
  VALID_NAME,
  VALID_PASSWORD,
} from "./consts";

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
