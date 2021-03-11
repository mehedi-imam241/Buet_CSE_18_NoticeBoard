import React, { createContext, useState } from "react";

export const NoticeListContext = createContext();

export const NoticeListProvider = (props) => {
  const [noticeList, setNoticeList] = useState([]);

  return (
    <NoticeListContext.Provider value={[noticeList, setNoticeList]}>
      {props.children}
    </NoticeListContext.Provider>
  );
};
