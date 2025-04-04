import { useContext } from "react";
import { jwtDecode } from "jwt-decode";

import AuthContext from "./context";
import authStorage from "./storage";

export default useAuth = () => {
  const { user, setUser } = useContext(AuthContext);

  const logIn = (authToken) => {
    const user = jwtDecode(authToken);
    setUser(user);
    console.log(authToken);
    authStorage.storeToken(authToken);

  };

  const logOut = () => {
    setUser(null);
    authStorage.removeToken();
  };
  // In useAuth.js

  // ... existing code

  const updateUser = (newUserData) => {
    setUser((prev) => ({ ...prev, ...newUserData }));
  };

  return { user, logOut, updateUser, logIn };
};
