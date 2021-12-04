import { useEffect, useContext } from "react";
// css import
import "./App.css";

// components import
import Navbar from "./components/Navbar";
import Activity from "./components/Activity";
import { GlobalContext } from "./GlobalState";
import { setUser } from "./actions";
function App() {
  const { dispatch } = useContext(GlobalContext);
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      dispatch(setUser(JSON.parse(user)));
    }
  }, [dispatch]);
  return (
    <div>
      <Navbar />
      <Activity />
    </div>
  );
}

export default App;
