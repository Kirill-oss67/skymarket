import React from "react";
import img from "../../images/malvestida-u79wy47kvVs-unsplash.jpg";

function Card(card) {
  return (
    <li className="card" key={card.id}>
      {card.image ? (
        <img src={card.image} className="card-img" alt="product img" />
      ) : card.image === null ? (
        <div className="card-img_null" />
      ) : (
        <img src={img} className="card-img" alt="product img" />
      )}
      <div className="card__description">
        <h2 className="card__title">{card.title}</h2>
        <p className="card__price">{card.price} &#8381;</p>
      </div>
    </li>
  );
}

export default Card;
