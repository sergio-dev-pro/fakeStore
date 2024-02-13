import { ERROR_MESSAGE } from "@/consts/validation";
import { validatePhone, validateUsername, validateZipcode } from "./validation";

describe("Validation tests", () => {
  test("validateUsername", () => {
    // username < 3 retorna erro
    let usernameValidation = validateUsername("");
    expect(usernameValidation.isValid).toBe(false);
    expect(usernameValidation.msg).toBe(ERROR_MESSAGE.USER_NAME);
    // Retornar erro se tiver espaços em branco
    usernameValidation = validateUsername("Bob ");
    expect(usernameValidation.isValid).toBe(false);
    expect(usernameValidation.msg).toBe(ERROR_MESSAGE.USER_NAME);
    // Retorna erro se tiver mais de 20 caracteres
    usernameValidation = validateUsername("BobBobBobBobBobBobBob");
    expect(usernameValidation.isValid).toBe(false);
    expect(usernameValidation.msg).toBe(ERROR_MESSAGE.USER_NAME);
    // Retorna username valido
    usernameValidation = validateUsername("Bob");
    expect(usernameValidation.isValid).toBe(true);
    expect(usernameValidation.msg).toBeUndefined();
  });
  test("validatePhone", () => {
    // Telefone inválido se não tiver 11 digitos ou 9 depois do ddd
    let phoneValidation = validatePhone("10292882109");
    expect(phoneValidation.isValid).toBe(false);
    expect(phoneValidation.msg?.[0]).toBe(ERROR_MESSAGE.PHONE.INVALID);
    // DDD inválido
    phoneValidation = validatePhone("10992882109");
    expect(phoneValidation.isValid).toBe(false);
    expect(phoneValidation.msg?.[0]).toBe(ERROR_MESSAGE.PHONE.INVALID_DDD);
  });
  test("validateZipcode", () => {
    // Telefone inválido se não tiver 8 digitos
    let zipcodeValidation = validateZipcode("1234567");
    expect(zipcodeValidation.isValid).toBe(false);
    expect(zipcodeValidation.msg).toBe(ERROR_MESSAGE.ZIPCODE);
    // CEP valido
    zipcodeValidation = validateZipcode("12345678");
    expect(zipcodeValidation.isValid).toBe(true);
    expect(zipcodeValidation.msg).toBeUndefined();
  });
});
