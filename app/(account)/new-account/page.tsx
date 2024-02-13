"use client";
import { Input } from "@/components/Input";
import React, { ChangeEvent, EventHandler, useReducer, useState } from "react";
import { Logo } from "@/components/Logo";
import "@/styles/globals.scss";
import "./page.scss";
import { LABEL } from "@/consts/newAccountPage";
import { Button } from "@/components/Button";
import {
  validateCity,
  validateName,
  validateNum,
  validatePassword,
  validatePasswordConfirm,
  validatePhone,
  validateStreet,
  validateUsername,
  validateZipcode,
} from "@/helpers/validation";
import {
  formatCEP,
  formatCity,
  formatNumber,
  formatPhone,
} from "@/helpers/format";

type InputStates = typeof initialState;
type ActionType = keyof InputStates;
type Action = {
  type: ActionType;
  payload: string;
};

const initialState = {
  email: { value: "", error: undefined },
  username: { value: "", error: validateUsername("").msg },
  password: { value: "", error: validatePassword("").msg },
  passwordConfirm: { value: "", error: validatePasswordConfirm("", "").msg },
  firstname: { value: "", error: validateName("").msg },
  lastname: { value: "", error: validateName("").msg },
  city: { value: "", error: validateCity("").msg },
  street: { value: "", error: validateStreet("").msg },
  number: { value: "", error: validateNum("").msg },
  zipcode: { value: "", error: validateZipcode("").msg },
  lat: { value: "0", error: undefined },
  long: { value: "0", error: undefined },
  phone: { value: "", error: validatePhone("").msg?.[0] },
};

const reducer = <T,>(state: T, { payload, type }: Action) => {
  switch (type) {
    case "email":
      return {
        ...state,
        email: { value: payload, error: undefined },
      };
    case "username":
      return {
        ...state,
        username: { value: payload, error: validateUsername(payload).msg },
      };
    case "password":
      return {
        ...state,
        password: {
          value: payload.replace(/\s/g, ""),
          error: validatePassword(payload).msg,
        },
      };
    case "passwordConfirm":
      return {
        ...state,
        passwordConfirm: {
          value: payload.replace(/\s/g, ""),
          error: validatePasswordConfirm(
            (state as InputStates).password.value,
            payload
          ).msg,
        },
      };
    case "firstname":
      return { ...state, firstname: { value: payload, error: undefined } };
    case "lastname":
      return { ...state, lastname: { value: payload, error: undefined } };
    case "city":
      return {
        ...state,
        city: { value: formatCity(payload), error: validateCity(payload).msg },
      };
    case "street":
      return {
        ...state,
        street: { value: payload, error: validateStreet(payload).msg },
      };
    case "number":
      return {
        ...state,
        number: {
          value: formatNumber(payload),
          error: validateNum(payload).msg,
        },
      };
    case "zipcode":
      return {
        ...state,
        zipcode: {
          value: formatCEP(payload),
          error: validateZipcode(payload).msg,
        },
      };
    case "lat":
      return {
        ...state,
        lat: { value: payload, error: undefined },
      };
    case "long":
      return {
        ...state,
        long: { value: payload, error: undefined },
      };
    case "phone":
      return {
        ...state,
        phone: {
          value: formatPhone(payload),
          error: validatePhone(payload).msg?.[0],
        },
      };
    default:
      return state;
  }
};

export default function NewAccount() {
  const [
    {
      username,
      firstname,
      lastname,
      phone,
      zipcode,
      number,
      street,
      city,
      password,
      passwordConfirm,
    },
    dispatch,
  ] = useReducer<typeof reducer<InputStates>>(reducer, initialState);
  const [mustShowErrors, setMustShowErrors] = useState(false);

  const buildHandleChange =
    (actionType: ActionType) => (e: ChangeEvent<HTMLInputElement>) =>
      dispatch({ type: actionType, payload: e.target.value });

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (username.error) setMustShowErrors(true);
  };

  const showErrorMsg = (msg: string | undefined) =>
    mustShowErrors ? msg : undefined;

  return (
    <main>
      <Logo />
      <form className="form-container">
        <Input
          containerClassName="form-container__input--full-column"
          label={LABEL.USER_NAME}
          onChange={buildHandleChange("username")}
          value={username.value}
          errorMessage={showErrorMsg(username.error)}
        />
        <Input
          containerClassName="form-container__input--full-column"
          label={LABEL.FIRST_NAME}
          onChange={buildHandleChange("firstname")}
          errorMessage={showErrorMsg(firstname.error)}
          value={firstname.value}
        />
        <Input
          containerClassName="form-container__input--full-column"
          label={LABEL.LAST_NAME}
          onChange={buildHandleChange("lastname")}
          errorMessage={showErrorMsg(lastname.error)}
          value={lastname.value}
        />
        <Input
          containerClassName="form-container__phone-input"
          label={LABEL.PHONE}
          onChange={buildHandleChange("phone")}
          errorMessage={showErrorMsg(phone.error)}
          value={phone.value}
        />
        <Input
          containerClassName="form-container__zipcode-input"
          label={LABEL.CEP}
          onChange={buildHandleChange("zipcode")}
          value={zipcode.value}
          errorMessage={showErrorMsg(zipcode.error)}
        />
        <Input
          containerClassName="form-container__street-input"
          label={LABEL.STREET}
          onChange={buildHandleChange("street")}
          value={street.value}
          errorMessage={showErrorMsg(street.error)}
        />
        <Input
          containerClassName="form-container__number-input"
          label={LABEL.NUMBER}
          onChange={buildHandleChange("number")}
          value={number.value}
          errorMessage={showErrorMsg(number.error)}
          />
        <Input
          containerClassName="form-container__city-input"
          label={LABEL.CITY}
          onChange={buildHandleChange("city")}
          value={city.value}
          errorMessage={showErrorMsg(city.error)}
          />
        <Input
          containerClassName="form-container__password-input"
          label={LABEL.PASSWORD}
          value={password.value}
          errorMessage={showErrorMsg(password.error)}
          onChange={buildHandleChange("password")}
          />
        <Input
          containerClassName="form-container__password-confirm-input"
          label={LABEL.CONFIRM_PASSWORD}
          onChange={buildHandleChange("passwordConfirm")}
          value={passwordConfirm.value}
          errorMessage={showErrorMsg(passwordConfirm.error)}
        />
      </form>
        <Button onClick={handleSubmit}>Criar</Button>
    </main>
  );
}
