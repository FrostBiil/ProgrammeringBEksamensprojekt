import { createContext, useEffect, useState } from "react";
import { Api } from "../utils/api";

interface AuthContextProps {
  user: User | null;
  loaded: boolean;
  login: () => void;
  logout: () => void;
}

export function AuthProvider(props: React.PropsWithChildren<{}>) {
  const [user, setUser] = useState<User | null>(null);
  const [loaded, setLoaded] = useState(false);
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
        setLoaded(true);
    });
  }, []);

  return (
    <AuthContext.Provider value={{user, login, logout, loaded}}>
      {props.children}
    </AuthContext.Provider>
  );
}

export const AuthContext = createContext({} as AuthContextProps);
