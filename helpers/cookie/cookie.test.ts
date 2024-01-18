import { getCredentialsByCookie, setAuthCookie } from "./cookie";

describe("cookies test", () => {
  test("getCredentialsByCookie", () => {
    expect(getCredentialsByCookie()).toBeNull();
  });
  test("setAuthCookie", () => {
    const username = "name",
      token = "token";
    setAuthCookie(username, token);
    const credentials = getCredentialsByCookie();
    expect(typeof credentials?.username).toBe("string");
    expect(typeof credentials?.token).toBe("string");
  });
});
