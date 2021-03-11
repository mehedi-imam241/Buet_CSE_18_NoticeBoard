import React, { createContext, useState } from "react";

export const NoticeContext = createContext();

export const NoticeProvider = (props) => {
  const [notice, setNotice] = useState({});

  return (
    <NoticeContext.Provider value={[notice, setNotice]}>
      {props.children}
    </NoticeContext.Provider>
  );
};
