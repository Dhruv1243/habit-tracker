import React from "react";
import HomePage from "./pages/HomePage.jsx";
import Login from "./pages/LoginPage.jsx";
import { Route, Routes } from "react-router";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/home" element={<Login />}></Route>
      </Routes>
    </div>
  );
};

export default App;
