import { createContext } from "react";

export const UserContext = createContext<UserModelContext>({
  user: {
    id: 0,
    name: "",
    access_token: "",
  },
  setUser: () => {},
});

export interface UserModelContext {
  user: User;
  setUser: (user: User) => void;
}

export interface User {
  id: number;
  name: string;
  access_token: string;
}
