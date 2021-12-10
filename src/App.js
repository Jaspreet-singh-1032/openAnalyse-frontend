// css import
import "./App.css";

// components import
import Navbar from "./components/Navbar";
import Activity from "./components/Activity";
import MessageBar from "./components/MessageBar";

function App() {
  return (
    <div>
      <Navbar />
      <MessageBar />
      <Activity />
    </div>
  );
}

export default App;
