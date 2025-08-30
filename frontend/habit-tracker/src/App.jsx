import React from "react";
import HomePage from "./pages/HomePage.jsx";
import Login from "./pages/LoginPage.jsx";
import { Route, Routes, BrowserRouter } from "react-router-dom";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />}></Route>
      <Route path="/login" element={<Login />}></Route>
    </Routes>
  );
};

export default App;
