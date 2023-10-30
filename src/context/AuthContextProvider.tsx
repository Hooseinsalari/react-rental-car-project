import {
  createContext,
  ReactNode,
  useContext,
  useState,
  useEffect,
} from "react";
import { FormValues } from "../interfaces";

interface UserData {
  jwt: string | null;
  user: FormValues | null;
}

interface AuthContext {
  userData: UserData;
  setUserData: (userData: UserData) => void;
}

const authContext = createContext<AuthContext>({} as AuthContext);

const LOCAL_STORAGE_AUTH_KEY = "authState";

const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [userData, setUserData] = useState<UserData>({
    jwt: null,
    user: null,
  });

  useEffect(() => {
    let data = localStorage.getItem(LOCAL_STORAGE_AUTH_KEY);
    if (data) {
      setUserData(JSON.parse(data));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_AUTH_KEY, JSON.stringify(userData));
  }, [userData]);

  return (
    <authContext.Provider value={{ userData, setUserData }}>
      {children}
    </authContext.Provider>
  );
};

export default AuthContextProvider;

export const useAuth = () => {
  const { userData, setUserData } = useContext(authContext);
  return { userData, setUserData };
};
