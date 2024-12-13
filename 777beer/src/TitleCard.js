import React from 'react';
import './TitleCard.css';
import seanImg from './artifacts/sean.png';
import brandonImg from './artifacts/brandon.png';

const TitleCard = () => {
    return (
      <div className="title-card">
        <img
          src={brandonImg}
          alt="Brandon"
          className="title-card__image"
        />
        <div className="title-card__content">
          <h1 className="title-card__title">Donger and Shawooboo Drink a Lot</h1>
          <p className="title-card__description">
            Liquid Evidence: The Comprehensive Intoxication Inventory
          </p>
        </div>
        <img
          src={seanImg}
          alt="Sean"
          className="title-card__image"
        />
      </div>
    );
  };
  

export default TitleCard;
