import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import DataContext from "./components/dataProvider";
import styled from "styled-components";
const Background = styled.div`
  background-color: #272829;
  height: 100%;
`;
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <Background>
      <App />
    </Background>
  </StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
