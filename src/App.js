import React, { useContext } from "react";

import { Routes, Route } from "react-router-dom";

// components import
import Navbar from "./components/Navbar";
import MessageBar from "./components/MessageBar";
import Home from "./components/Home";
import Main from "./components/Main";
import Footer from "./components/Footer";
import { GlobalContext } from "./GlobalState";

// css import
import "./App.css";

function App() {
  const { state } = useContext(GlobalContext);
  return (
    <div className="app">
      <Navbar />
      <MessageBar />
      <Routes>
        <Route path="/" element={<Home />} />
        {state.user && <Route path="app" element={<Main />} />}
        <Route path="*" element={<Home />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
