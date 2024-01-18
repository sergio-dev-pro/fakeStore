export const setAuthCookie = (username: string, token: string) => {
  document.cookie = `token=${token}; username=${username}`;
};

export const getCredentialsByCookie = (): {
  username: string;
  token: string;
} | null => {
  const tokenCook = document.cookie
    .split(",")
    .find((row) => row.startsWith("token="));
  if (!tokenCook) return null;
  const usernameCook = document.cookie
    .split(",")
    .find((row) => row.startsWith("username="));
  if (!usernameCook) return null;

  return {
    username: usernameCook?.split("=")[1],
    token: tokenCook?.split("=")[1],
  };
};

export const removeAuthCookie = () => {
  const pastDate = new Date(0);
  document.cookie = "token=; username=; expires=" + pastDate.toUTCString();
};