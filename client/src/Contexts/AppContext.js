import { createContext } from "react";

const AppContext = createContext({
  user: null,
  setUser: () => {},
  logout: () => {},
  redirect: (path, external) => {},
});

export default AppContext;
