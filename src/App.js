import React from "react";

import { Routes, Route } from "react-router-dom";

// components import
import Navbar from "./components/Navbar";
import MessageBar from "./components/MessageBar";
import Home from "./components/Home";
import Main from "./components/Main";

// css import
import "./App.css";

function App() {
  return (
    <div className="app">
      <Navbar />
      <MessageBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/app" element={<Main />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
