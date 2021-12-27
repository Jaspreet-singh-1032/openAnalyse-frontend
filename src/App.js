import React from "react";

// css import
import "./App.css";

// components import
import Navbar from "./components/Navbar";
import Activity from "./components/Activity";
import MessageBar from "./components/MessageBar";
import Visualize from "./components/Visualize";

function App() {
  return (
    <div>
      <Navbar />
      <MessageBar />
      <Activity />
      <Visualize />
    </div>
  );
}

export default App;
