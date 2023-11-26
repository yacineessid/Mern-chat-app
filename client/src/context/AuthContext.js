import React, { createContext, useCallback, useEffect, useState } from "react";
import { baseUrl, postRequest } from "../utils/Service";

export const AuthContext = createContext();

export function AuthContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [registerError, setRegisterError] = useState(null);
  const [registerLoading, setRegisterLoading] = useState(false);
  const [loginError, setLoginError] = useState(null); // Corrected the typo here
  const [loginLoading, setLoginLoading] = useState(false);
  const [registerInfo, setRegisterInfo] = useState({ name: '', email: '', password: '' });
  const [loginInfo, setLoginInfo] = useState({ email: '', password: '' });

  useEffect(() => {
    // How to get User
    const user = localStorage.getItem('User');
    setUser(JSON.parse(user));
  }, []);

  // Create function logout usecallback
  const logOut = useCallback(() => {
    localStorage.removeItem("User");
    setUser(null);
  }, []);

  const updateRegisterInfo = useCallback(
    (info) => {
      setRegisterInfo(info);
    },
    []
  );

  const postRegister = useCallback(async (e) => {
    e.preventDefault();
    setRegisterLoading(true);
    setRegisterError(null);

    try {
      const response = await postRequest(`${baseUrl}/register`, registerInfo);

      if (response.error) {
        setRegisterError(response.message);
      } else {
        localStorage.setItem('User', JSON.stringify(response));
        setUser(response);
      }
    } catch (error) {
    } finally {
      setRegisterLoading(false);
    }
  }, [registerInfo]);

  // Update Login Info function
  const updateLoginInfo = useCallback((info) => {
    setLoginInfo(info);
  }, []);

  const login = useCallback(async (e) => {
    e.preventDefault();
    setLoginLoading(true);
    setLoginError(null);
  
    try {
      const res = await postRequest(`${baseUrl}/login`, loginInfo);
      setLoginLoading(false);
  
      if (res.error) {
        setLoginError(res);
      } else {
        localStorage.setItem('User', JSON.stringify(res));
        setUser(res);
      }
    } catch (error) {
      console.error("Error in login:", error);
    } finally {
      setLoginLoading(false);
    }
  }, [loginInfo]);
  

  return (
    <AuthContext.Provider value={{ user, registerInfo, updateRegisterInfo, postRegister, logOut, registerError, registerLoading, login, updateLoginInfo, loginError, loginLoading, loginInfo }}>
      {children}
    </AuthContext.Provider>
  );
}
