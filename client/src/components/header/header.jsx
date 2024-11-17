import "./header.css";
import React from "react";
import { Link } from "react-router-dom";
const header = () => {
  return (
    <>
      <header>
        <Link to="/">
          <h1 id="header-text">CREDCHAIN</h1>
        </Link>
      </header>
    </>
  );
};

export default header;
