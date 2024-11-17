import React from "react";

const connectedCard = ({ connectedAccountAddress, imgSrc, intro1, intro2 }) => {
  return (
    <>
      <h1>CONNECTED : {connectedAccountAddress}</h1>
      <img src={imgSrc} />
      <p>
        {intro1}
        <br />
        {intro2}
      </p>
    </>
  );
};

export default connectedCard;
