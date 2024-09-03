import React from "react";

import Home from "./pages/Home";
import { DataProvider } from "./components/dataProvider";
import Search from "./components/Search";
import ProductBox from "./components/ProductBox";
import ProductLayout from "./components/ProductLayout";
import AuthenticationPage from "./pages/AuthenticationPage";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import ProductDetail from "./pages/ProductDetails";
import styled from "styled-components";

function App() {
  return (
    <DataProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<AuthenticationPage />} />
          <Route path="/product/:id" element={<ProductDetail />} />
        </Routes>
      </Router>
    </DataProvider>
  );
}

export default App;
