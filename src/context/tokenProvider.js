import React, { createContext, useState, useEffect } from "react";

export const tokenContext = createContext();

export const TokenProvider = (props) => {
  const [token, setToken] = useState("");

  useEffect(() => {
    setToken(sessionStorage.getItem("jwt"));
  }, []);

  return (
    <tokenContext.Provider value={[token, setToken]}>
      {props.children}
    </tokenContext.Provider>
  );
};
