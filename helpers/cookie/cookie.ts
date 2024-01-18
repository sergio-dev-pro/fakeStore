export const setAuthCookie = (username: string, token: string) => {
  document.cookie = `token=${token};`;
  document.cookie = `username=${username};`;
};

export const getCredentialsByCookie = (): {
  username: string;
  token: string;
} | null => {
  const cookieString = document.cookie;
  if (cookieString.length === 0) return null;
  console.log('@@@cookieString', cookieString)
  const cookieArray = cookieString.split("; ");
  let credentials = {
    username: "",
    token: "",
  };
  for (const cookie of cookieArray) {
    const [key, value] = cookie.split("=");

    if (key === "token") {
      credentials.token = value;
    } else if (key === "username") {
      credentials.username = value;
    }
  }
  
  return credentials;
};

export const removeAuthCookie = () => {
  document.cookie = "token=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
  document.cookie = "username=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
};
