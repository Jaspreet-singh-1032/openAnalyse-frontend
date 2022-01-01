import React from "react";
import Container from "@mui/material/Container";

import chartExample from "../static/chart-example.png";
import "./Home.css";

function Home() {
  return (
    <div className="home">
      <Container>
        <div className="home__mainText">
          <h1>Keep learning! Keep Growing!</h1>
          <h2>
            openAnalyse is an open-source application that helps users to
            analyse how they are investing their time.
          </h2>
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
            Generally everyone have some goals in life. Long term goals and
            short term goals.
            <br />
            And to achieve those goals we have to take little steps everyday.
            <br />
            And this is for what this app is.
          </p>
        </div>
      </Container>
    </div>
  );
}

export default Home;
