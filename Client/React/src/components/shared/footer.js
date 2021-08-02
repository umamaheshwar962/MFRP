import React from "react";
import styles from "./footer.module.scss";
import { Link } from "react-router-dom";
import { FacebookIcon, TwitterIcon, InstaIcon, GitHubIcon } from "../icons";

const Footer = () => {
  return (
    <footer className={`${styles.footer} mt-2 p-3`} style={{ display: "flex" }}>
      <Link to="/about" style={{ flex: "1" }}>
        About
      </Link>
      <p style={{ flex: "1", margin: "0" }}>2020 &copy; Uma Mahesh</p>
      <div style={{ flex: "1" }}>
        <button style={{ backgroundColor: "#b8b8b8", border: "transparent" }}>
          {FacebookIcon}
        </button>
        <button style={{ backgroundColor: "#b8b8b8", border: "transparent" }}>
          {TwitterIcon}
        </button>
        <button style={{ backgroundColor: "#b8b8b8", border: "transparent" }}>
          {InstaIcon}
        </button>
        <button style={{ backgroundColor: "#b8b8b8", border: "transparent" }}>
          {GitHubIcon}
        </button>
      </div>
    </footer>
  );
};

export default Footer;
