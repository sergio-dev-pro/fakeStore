"use client";
import { ChangeEvent, useLayoutEffect, useState } from "react";
import { redirect, useRouter } from "next/navigation";
import { api } from "@/lib/api/api";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { Spinner } from "@/components/Spinner";
import { getCredentialsByCookie, setAuthCookie } from "@/helpers/cookie";
import {
  BUTTON_LABEL,
  NAME_ERROR_MSG,
  NAME_INPUT_LABEL,
  PASSWORD_ERROR_MSG,
  PASSWORD_INPUT_LABEL,
  VALID_NAME,
  VALID_PASSWORD,
} from "./consts";
import "./page.scss";

export default function Login() {
  const [name, setName] = useState({ value: "", isValid: true });
  const [password, setPassword] = useState({ value: "", isValid: true });
  const [shouldShowSpinner, setShouldShowSpinner] = useState(false);
  const [shouldShowErrorMessage, setShouldShowErrorMessage] = useState(false);
  const router = useRouter()

  useLayoutEffect(() => {
    if (getCredentialsByCookie()) redirect("/");
  }, []);

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

    (async () => {
      try {
        setShouldShowSpinner(true);
        const username = name.value;
        const response = await api.post("auth/login", {
          username,
          password: password.value,
        });
        setAuthCookie(username, response.data.token);
      } catch (error) {
        setShouldShowErrorMessage(true);
      } finally {
        setShouldShowSpinner(false);
        if (getCredentialsByCookie()) router.push("/");
      }
    })();
  };

  const nameErrorMsg = !name.isValid ? NAME_ERROR_MSG : undefined;
  const passwordErrorMsg = !password.isValid ? PASSWORD_ERROR_MSG : undefined;

  return (
    <div className="form-wrapper">
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
          <Spinner
            isVisible={shouldShowSpinner}
            className="signin-form__spinner"
          />
          <Button onClick={handleSubmit}>{BUTTON_LABEL}</Button>
        </div>
      </form>
      {shouldShowErrorMessage && (
        <span className="error-message">Algo deu errado: tente novamente</span>
      )}
    </div>
  );
}
