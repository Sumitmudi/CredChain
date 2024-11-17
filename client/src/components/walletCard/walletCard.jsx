import React from "react";
import "./walletCard.css";
import Button from "../button/button";

const walletCard = ({ imgSrc, heading, intro }) => {
  return (
    <div id="wallet-card">
      <img src={imgSrc} />
      <h1>{heading}</h1>
      <p>{intro}</p>
      <Button label="Connect to Wallet" />
    </div>
  );
};

export default walletCard;
