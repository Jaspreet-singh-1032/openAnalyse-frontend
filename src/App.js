import { useEffect, useContext } from "react";
// css import
import "./App.css";

// components import
import Navbar from "./components/Navbar";
import Activity from "./components/Activity";
import MessageBar from "./components/MessageBar";
import { GlobalContext } from "./GlobalState";
import { setUser } from "./actions";
import { getUserApi } from "./api/Auth";

function App() {
  const { dispatch } = useContext(GlobalContext);

  useEffect(() => {
    const getUser = async () => {
      const response = await getUserApi();
      if (response.status === 200) {
        dispatch(setUser(response.data));
      }
    };
    getUser();
  }, [dispatch]);
  return (
    <div>
      <Navbar />
      <MessageBar />
      <Activity />
    </div>
  );
}

export default App;
