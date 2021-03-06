import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";

// material ui imports
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import GitHubIcon from "@mui/icons-material/GitHub";

// components import
import { GlobalContext } from "../GlobalState";
import GoogleAuthLogin from "./GoogleAuthLogin";
import NavMenu from "./NavMenu";

// css import
import "./Navbar.css";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 300,
  bgcolor: "background.paper",
  // border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function Navbar() {
  const { state, userLogin, userRegister } = useContext(GlobalContext);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [open, setOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const login = "login";

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      userLogin(email, password, setOpen);
    } else {
      userRegister(email, password, username, setOpen);
    }
    setPassword("");
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
      <Link to="/" className="navbar__brand">
        <h1>openAnalyse</h1>
      </Link>
      <a
        href="https://github.com/Jaspreet-singh-1032/openAnalyse-frontend"
        target="_blank"
        rel="noreferrer"
      >
        <GitHubIcon sx={{ width: 28, height: 28 }} />
      </a>
      <div className="navbar__loginContainer">
        {!state.user ? (
          <>
            <GoogleAuthLogin />
          </>
        ) : (
          <>
            <NavMenu user={state.user} />
          </>
        )}
      </div>
    </div>
  );
}

export default Navbar;
