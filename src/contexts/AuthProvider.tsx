import { createContext, useEffect, useState } from "react";
import { Api } from "../utils/api";

interface AuthContextProps {
  user: User | null;
  login: () => void;
  logout: () => void;
}

export function AuthProvider(props: React.PropsWithChildren<{}>) {
  const [user, setUser] = useState<User | null>(null);
  const login = () => {
    Api.login();
  };

  const logout = () => {
    Api.logout();
    setUser(null);
  };

  useEffect(() => {
    Api.me().then((user) => {
        setUser(user);
    });
  }, []);

  return (
    <AuthContext.Provider value={{user, login, logout}}>
      {props.children}
    </AuthContext.Provider>
  );
}

export const AuthContext = createContext({} as AuthContextProps);
