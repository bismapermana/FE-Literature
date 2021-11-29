import React, { createContext, useReducer } from "react";

export const AuthContext = createContext();

const initialState = {
  isLogin: false,
  user: {},
};

const reducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case "LOGIN_SUCCESS":
      return {
        isLogin: true,
        user: payload,
      };
    case "LOGOUT":
      return {
        isLogin: false,
        user: {},
      };

    default:
      throw new Error();
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AuthContext.Provider value={[state, dispatch]}>
      {children}
    </AuthContext.Provider>
  );
};
