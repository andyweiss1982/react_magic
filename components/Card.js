import React from "react";

const Card = (props) => {
  const { title, image, colors } = props;
  return (
    <div className="card">
      <h2>{title}</h2>
      <img src={image} alt={name} />
      <h3>{colors.join(" ")}</h3>
    </div>
  );
};

export default Card;
