type User = {
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  role: string;
  status: string;
};

const isRememberMe = (): boolean => {
  if (localStorage.getItem("isRememberMe") !== null) {
    return JSON.parse(localStorage.getItem("isRememberMe") || 'false');
  }
  return true;
}

const setRememberMe = (isRemember: boolean): void => {
  localStorage.setItem("isRememberMe", JSON.stringify(isRemember));
}

const setItem = (key: string, value: string): void => {
  if (isRememberMe()) {
    localStorage.setItem(key, value);
  } else {
    sessionStorage.setItem(key, value);
  }
}

const getItem = (key: string): string | null => {
  if (isRememberMe()) {
    return localStorage.getItem(key);
  }
  return sessionStorage.getItem(key);
}

const removeItem = (key: string): void => {
  if (isRememberMe()) {
    localStorage.removeItem(key);
  } else {
    sessionStorage.removeItem(key);
  }
}

const setToken = (token: string): void => {
  setItem("token", token);
}

const removeToken = (): void => {
  removeItem("token");
}

const getToken = (): string | null => {
  return getItem("token");
}

const isAuth = (): boolean => {
  return getToken() !== null;
}

const setUserInfo = (user: User): void => {
  setItem("firstname", user.firstname);
  setItem("lastname", user.lastname);
  setItem("username", user.username);
  setItem("email", user.email);
  setItem("role", user.role);
  setItem("status", user.status);
}

const getUserInfo = (): User | null => {
  return {
    "firstname": getItem("firstname") || "",
    "lastname": getItem("lastname") || "",
    "username": getItem("username") || "",
    "email": getItem("email") || "",
    "role": getItem("role") || "",
    "status": getItem("status") || "",
  };
}

const removeUserInfo = (): void => {
  removeItem("firstname");
  removeItem("lastname");
  removeItem("username");
  removeItem("email");
  removeItem("role");
  removeItem("status");
};

// export
const Storage = { isRememberMe, setRememberMe, setToken, getToken, removeToken, isAuth, setUserInfo, getUserInfo, removeUserInfo };
export default Storage;
