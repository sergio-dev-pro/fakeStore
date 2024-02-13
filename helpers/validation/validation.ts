import { BrDDDs, ERROR_MESSAGE } from "@/consts/validation";

export type ValidateReturn<T = string> = { isValid: boolean; msg?: T };
export const validateUsername = (username: string): ValidateReturn => {
  const isValid =
    username.length >= 3 && username.length <= 20 && !username.includes(" ");
  const msg = isValid ? undefined : ERROR_MESSAGE.USER_NAME;
  return { isValid, msg };
};

export const validateName = (name: string): ValidateReturn => {
  const isValid = name.length > 2 && name.length < 21 && !name.includes(" ");
  const msg = isValid ? undefined : ERROR_MESSAGE.NAME;
  return { isValid, msg };
};

export const validatePhone = (phone: string): ValidateReturn<string[]> => {
  const cleanNumber: string = phone.replace(/\D/g, "");

  const msgs = [];
  const has11Characters = cleanNumber.length == 11;
  const has9InFront = cleanNumber.slice(2, 3) == "9";
  if (!has11Characters || !has9InFront) msgs.push(ERROR_MESSAGE.PHONE.INVALID);

  const ddd: string = cleanNumber.slice(0, 2);
  const isDDDValid = BrDDDs.includes(parseInt(ddd));
  if (!isDDDValid) msgs.push(ERROR_MESSAGE.PHONE.INVALID_DDD);

  if (msgs.length > 0) return { isValid: false, msg: msgs };

  return { isValid: true };
};

export const validateZipcode = (zipcode: string): ValidateReturn => {
  const cleanZipcode: string = zipcode.replace(/\D/g, "");
  let isValid = false;
  if (cleanZipcode.length != 8) return { isValid, msg: ERROR_MESSAGE.ZIPCODE };
  else isValid = true;

  return { isValid };
};

export const validateNum = (num: string): ValidateReturn => {
  const cleanNum: string = num.replace(/\D/g, "");
  let isValid = false;
  if (num.length === 0) return { isValid, msg: "Número inválido." };
  else isValid = true;
  return { isValid };
};

export const validateStreet = (street: string): ValidateReturn => {
  let isValid = false;
  if (street.length < 10)
    return { isValid, msg: "Rua deve ter no mínimo 10 caracteres." };
  else isValid = true;
  return { isValid };
};

export const validateCity = (city: string): ValidateReturn => {
  let isValid = false;
  if (city.length < 2)
    return { isValid, msg: "Cidade deve ter no mínimo 2 caracteres." };
  else isValid = true;
  return { isValid };
};

export const validatePassword = (password: string): ValidateReturn => {
  let isValid = false;
  if (password.includes(" "))
    return { isValid, msg: "Espaços em branco não são permititdos." };
  if (password.length < 6)
    return { isValid, msg: "Senha deve ter no mínimo 6 caracteres." };
  else isValid = true;
  return { isValid };
};
export const validatePasswordConfirm = (
  password: string,
  confirm: string
): ValidateReturn => {
  let isValid = false;
  if (password.includes(" "))
    return { isValid, msg: "Espaços em branco não são permititdos." };
  if (password.length < 6)
    return { isValid, msg: "Senha deve ter no mínimo 6 caracteres." };
  if (password != confirm)
    return { isValid, msg: "Senha é diferente da confirmação da senha." };
  else isValid = true;
  return { isValid };
};
