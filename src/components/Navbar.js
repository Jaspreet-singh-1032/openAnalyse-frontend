import React, { useState, useContext } from "react";

// material ui imports
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";

// components import
import { GlobalContext } from "../GlobalState";
import { setUser, setMessage } from "../actions";
import NavMenu from "./NavMenu";

// api imports
import { userLoginApi, userRegisterApi } from "../api/Auth";

// css import
import "./Navbar.css";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 300,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function Navbar() {
  const { state, dispatch } = useContext(GlobalContext);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [open, setOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const login = "login";
  const signup = "signup";

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      userLoginApi({ email, password }).then((response) => {
        if (response.status === 200) {
          dispatch(setUser(response.data.user));
          dispatch(
            setMessage({ text: response.data.detail, variant: "success" })
          );
          setPassword("");
          setOpen(false);
        } else {
          dispatch(
            setMessage({ text: response.data.detail, variant: "error" })
          );
        }
      });
    } else {
      userRegisterApi({ email, password, username }).then((response) => {
        if (response.status === 201) {
          dispatch(setUser(response.data.user));
          dispatch(
            setMessage({ text: response.data.detail, variant: "success" })
          );
          setOpen(false);
          setPassword("");
        } else {
          dispatch(
            setMessage({
              text: response.data.detail || response.data.email[0],
              variant: "error",
            })
          );
        }
      });
    }
  };

  const openModal = ({ modalType }) => {
    setOpen(true);
    if (modalType === login) {
      setIsLogin(true);
      setIsSignup(false);
    } else {
      setIsSignup(true);
      setIsLogin(false);
    }
  };

  return (
    <div className="navbar">
      {/* Modal */}
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form className="navbar__form" onSubmit={handleSubmit}>
            <TextField
              id="emailInput"
              type="email"
              label="Email"
              variant="standard"
              required
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {isSignup && (
              <TextField
                id="usernameInput"
                label="Username"
                variant="standard"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            )}
            <TextField
              id="passwordInput"
              type="password"
              label="Password"
              variant="standard"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {isLogin ? (
              <Button type="submit">Login </Button>
            ) : (
              <Button type="submit">Sign Up </Button>
            )}
          </form>
        </Box>
      </Modal>
      {/* ======================= End Modal ======================= */}
      <h1>openAnalyse</h1>
      <div className="navbar__loginContainer">
        {state.user.email === undefined ? (
          <>
            <Button onClick={() => openModal({ modalType: login })}>
              Login
            </Button>
            <Button onClick={() => openModal({ modalType: signup })}>
              Sign up
            </Button>
          </>
        ) : (
          <>
            <NavMenu user={state.user} dispatch={dispatch} />
          </>
        )}
      </div>
    </div>
  );
}

export default Navbar;
