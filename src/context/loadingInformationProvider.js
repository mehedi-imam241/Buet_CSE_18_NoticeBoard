import React, { createContext, useState } from "react";

export const LoadingInformationContext = createContext();

export const LoadingInformationProvider = (props) => {
  const [loading, setLoading] = useState(false);

  return (
    <LoadingInformationContext.Provider value={[loading, setLoading]}>
      {props.children}
    </LoadingInformationContext.Provider>
  );
};
