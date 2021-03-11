import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { TokenProvider } from "./context/tokenProvider";
import { NoticeListProvider } from "./context/noticeListProvider";
import { NoticeProvider } from "./context/noticeProvider";
import { LoadingInformationProvider } from "./context/loadingInformationProvider";
ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <NoticeListProvider>
        <NoticeProvider>
          <TokenProvider>
            <LoadingInformationProvider>
              <App />
            </LoadingInformationProvider>
          </TokenProvider>
        </NoticeProvider>
      </NoticeListProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
