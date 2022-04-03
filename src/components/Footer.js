import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <div className="footer">
      <div className="footer__main">For any suggestions or feedback:-</div>
      <div className="footer__linksContainer">
        <a
          href="https://twitter.com/jaspreet1032"
          target="_blank"
          rel="noreferrer"
        >
          Twitter
        </a>
        <br />
        <a
          href="https://www.linkedin.com/in/jaspreet-singh-13868a1b2/"
          target="_blank"
          rel="noreferrer"
        >
          Linkedin
        </a>
        <br />
        <a href="mailto:jassimehra2612@gmail.com">Gmail</a>
      </div>
      <div className="footer__main">Guthub links:-</div>
      <div className="footer__linksContainer">
        <a
          href="https://github.com/Jaspreet-singh-1032/openAnalyse-frontend"
          target="_blank"
          rel="noreferrer"
        >
          openAnalyse frontend
        </a>
        <br />
        <a
          href="https://github.com/Jaspreet-singh-1032/open_analyse_backend"
          target="_blank"
          rel="noreferrer"
        >
          openAnalyse backend
        </a>
      </div>
    </div>
  );
}

export default Footer;
