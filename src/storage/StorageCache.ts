export type User = {
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  role: string;
  status: string;
};

export const isRememberMe = () => {
  // if (localStorage.getItem("isRememberMe") !== null) {
  //   return JSON.parse(localStorage.getItem("isRememberMe") || 'false');
  // }
  // return true;
  if (localStorage.getItem("isRememberMe")) {
    console.log(localStorage.getItem("isRememberMe"))
    return Boolean(localStorage.getItem("isRememberMe"));
  }

  if (sessionStorage.getItem("isRememberMe")) {
    console.log(sessionStorage.getItem("isRememberMe"))
    return Boolean(sessionStorage.getItem("isRememberMe"));
  }
};

export const setRememberMe = (isRemember: boolean): void => {
  localStorage.setItem("isRememberMe", JSON.stringify(isRemember));
};

export const setItem = (key: string, value: string): void => {
  if (isRememberMe()) {
    localStorage.setItem(key, value);
  } else {
    sessionStorage.setItem(key, value);
  }
};

export const getItem = (key: string): string | null => {
  if (isRememberMe()) {
    return localStorage.getItem(key);
  }
  return sessionStorage.getItem(key);
};

export const removeItem = (key: string): void => {
  if (isRememberMe()) {
    localStorage.removeItem(key);
  } else {
    sessionStorage.removeItem(key);
  }
};

export const setToken = (token: string): void => {
  setItem("token", token);
};

export const removeToken = (): void => {
  removeItem("token");
};

export const getToken = (): string | null => {
  return getItem("token");
};

export const isAuth = (): boolean => {
  return getToken() !== null;
};

export const setUserInfo = (user: User): void => {
  setItem("firstname", user.firstname);
  setItem("lastname", user.lastname);
  setItem("username", user.username);
  setItem("email", user.email);
  setItem("role", user.role);
  setItem("status", user.status);
};

export const getUserInfo = (): User | null => {
  return {
    firstname: getItem("firstname") || "",
    lastname: getItem("lastname") || "",
    username: getItem("username") || "",
    email: getItem("email") || "",
    role: getItem("role") || "",
    status: getItem("status") || "",
  };
};

export const removeUserInfo = (): void => {
  removeItem("firstname");
  removeItem("lastname");
  removeItem("username");
  removeItem("email");
  removeItem("role");
  removeItem("status");
};
