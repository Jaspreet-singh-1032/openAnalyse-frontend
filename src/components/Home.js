import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import chartExample from "../static/chart-example.png";

import "./Home.css";

import { GlobalContext } from "../GlobalState";

function Home() {
  const { state } = useContext(GlobalContext);
  return (
    <div className="home">
      <Container>
        <div className="home__mainText">
          <h1>Keep learning! Keep Growing!</h1>
          <h2>
            openAnalyse is an Free and open-source application that helps users
            to analyse how they are investing their time.
          </h2>
          {state.user && (
            <div className="home__goToAppButton">
              <Link to="/app" style={{ textDecoration: "none" }}>
                <Button variant="contained">Go to app</Button>
              </Link>
            </div>
          )}
        </div>
        <div className="home__chartExampleConatiner">
          <h3>See chart visualizations of how did you spent your time.</h3>
          <img className="chartImg" src={chartExample} alt="img" />
        </div>
        <div className="home__description">
          <h1>Why this app ?</h1>
          <p>
            The main idea behind this app is to help students/learners to
            analyse how they are investing their time.
            <br />
            Everyone have some goals in life.
            <br />
            And to achieve those goals we have to take little steps everyday.
            <br />
            openAnalyse provides chart visualizations of time invested on each
            activity using various time frame filters.
            <br />
          </p>
        </div>
      </Container>
    </div>
  );
}

export default Home;
