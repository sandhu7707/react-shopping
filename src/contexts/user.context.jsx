import { createContext } from "react";
import { useState, useEffect } from "react";
import {
  auth,
  onAuthStateChangedListener,
} from "../utils/firebase/firebase.utils";

export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: null,
});

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const value = { currentUser, setCurrentUser };

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
        setCurrentUser(user);
    });

    return unsubscribe;   // runs when unmounts
  }, []);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
