import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import NotificationContextProvider from "./components/contexts/NotificationContext";
import "./index.css";
import store, { reduxHistory } from "./redux/store/store";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <NotificationContextProvider>
      <Provider store={store}>
        <BrowserRouter history={reduxHistory}>
          <App />
        </BrowserRouter>
      </Provider>
    </NotificationContextProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
