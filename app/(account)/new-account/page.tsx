"use client";
import { Input } from "@/components/Input";
import React, { ChangeEvent, EventHandler, useReducer, useState } from "react";
import { Logo } from "@/components/Logo";
import "@/styles/globals.scss";
import styles from "./page.module.scss";
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
import { Spinner } from "@/components/Spinner";
import { api } from "@/lib/api/api";
import { useRouter } from "next/navigation";

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
  const [shouldShowSpinner, setShouldShowSpinner] = useState(false);
  const [shouldShowErrorMessage, setShouldShowErrorMessage] = useState(false);

  const router = useRouter();

  const buildHandleChange =
    (actionType: ActionType) => (e: ChangeEvent<HTMLInputElement>) =>
      dispatch({ type: actionType, payload: e.target.value });

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (
      username.error ||
      firstname.error ||
      lastname.error ||
      phone.error ||
      zipcode.error ||
      number.error ||
      street.error ||
      city.error ||
      password.error ||
      passwordConfirm.error
    )
      return setMustShowErrors(true);

    (async () => {
      try {
        setShouldShowSpinner(true);
        const newUser = {
          // FIXME: Adiconar valor recebido por input
          email: "John@gmail.com",
          username: username.value,
          password: password.value,
          name: {
            firstname: firstname.value,
            lastname: lastname.value,
          },
          address: {
            city: city.value,
            street: street.value,
            number: number.value,
            zipcode: zipcode.value,
            geolocation: {
              lat: "-37.3159",
              long: "81.1496",
            },
          },
          phone: phone.value,
        };
        const response = await api.post("users", newUser);
        router.push("/signin");
      } catch (error) {
        setShouldShowErrorMessage(true);
      } finally {
        setShouldShowSpinner(false);
      }
    })();
  };

  const showErrorMsg = (msg: string | undefined) =>
    mustShowErrors ? msg : undefined;

  return (
    <main className={styles.main}>
      <Logo />
      <form className={styles.formContainer}>
        <Input
          containerClassName={styles.inputFullColumn}
          label={LABEL.USER_NAME}
          onChange={buildHandleChange("username")}
          value={username.value}
          errorMessage={showErrorMsg(username.error)}
        />
        {/* TODO: Adicionar campo de email com validação */}
        <Input
          containerClassName={styles.inputFullColumn}
          label={LABEL.FIRST_NAME}
          onChange={buildHandleChange("firstname")}
          errorMessage={showErrorMsg(firstname.error)}
          value={firstname.value}
        />
        <Input
          containerClassName={styles.inputFullColumn}
          label={LABEL.LAST_NAME}
          onChange={buildHandleChange("lastname")}
          errorMessage={showErrorMsg(lastname.error)}
          value={lastname.value}
        />
        <Input
          containerClassName={`${styles.phoneInput} ${styles.inputFullColumn}`}
          label={LABEL.PHONE}
          onChange={buildHandleChange("phone")}
          errorMessage={showErrorMsg(phone.error)}
          value={phone.value}
        />
        <Input
          containerClassName={`${styles.zipcodeInput} ${styles.inputFullColumn}`}
          label={LABEL.CEP}
          onChange={buildHandleChange("zipcode")}
          value={zipcode.value}
          errorMessage={showErrorMsg(zipcode.error)}
        />
        <Input
          containerClassName={`${styles.streetInput} ${styles.inputFullColumn}`}
          label={LABEL.STREET}
          onChange={buildHandleChange("street")}
          value={street.value}
          errorMessage={showErrorMsg(street.error)}
        />
        <Input
          containerClassName={`${styles.numberInput} ${styles.inputFullColumn}`}
          label={LABEL.NUMBER}
          onChange={buildHandleChange("number")}
          value={number.value}
          errorMessage={showErrorMsg(number.error)}
        />
        <Input
          containerClassName={`${styles.cityInput} ${styles.inputFullColumn}`}
          label={LABEL.CITY}
          onChange={buildHandleChange("city")}
          value={city.value}
          errorMessage={showErrorMsg(city.error)}
        />
        <Input
          type="password"
          containerClassName={`${styles.passwordInput} ${styles.inputFullColumn}`}
          label={LABEL.PASSWORD}
          value={password.value}
          errorMessage={showErrorMsg(password.error)}
          onChange={buildHandleChange("password")}
        />
        <Input
          type="password"
          containerClassName={`${styles.passwordConfirmInput} ${styles.inputFullColumn}`}
          label={LABEL.CONFIRM_PASSWORD}
          onChange={buildHandleChange("passwordConfirm")}
          value={passwordConfirm.value}
          errorMessage={showErrorMsg(passwordConfirm.error)}
        />
        <Spinner isVisible={shouldShowSpinner} className={styles.spinner} />
        <Button className={styles.button} onClick={handleSubmit}>
          Pronto
        </Button>
        {shouldShowErrorMessage && (
          <span className={styles.errorMessage}>
            Algo deu errado: tente novamente
          </span>
        )}
      </form>
    </main>
  );
}
