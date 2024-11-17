import "./cards.css";
import React from "react";
import Button from "../button/button";

const cards = ({ buttonLabel, imgSrc }) => {
  return (
    <>
      <section id="card">
        <img src={imgSrc}></img>
        <Button label={buttonLabel} />
      </section>
    </>
  );
};

export default cards;
