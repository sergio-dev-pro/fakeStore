import { formatCEP, formatPhone } from ".";

describe("Format tests", () => {
  test("formatPhone", () => {
    const formated = formatPhone("99999999999");
    expect(formated).toBe("99 9 9999-9999");
  });
  test("formatCEP", () => {
    const formated = formatCEP("99999999");
    expect(formated).toBe("99999-999");
  });
});
