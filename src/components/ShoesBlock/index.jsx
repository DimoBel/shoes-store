import React from 'react';

import { Link } from 'react-router-dom';

function ShoesBlock({ id, title, price, imageUrl }) {
  return (
    <div className="shoes-block-wrapper">
      <div className="shoes-block">
        <Link key={id} to={`/shoes/${id}`}>
          <img className="shoes-block__image" src={imageUrl} alt="Shoes" />
          <h4 className="shoes-block__title">{title}</h4>
          <div className="shoes-block__bottom">
            <div className="shoes-block__price">{price} ₴</div>
            <button className="button button--outline button--add">
              <span>Переглянути</span>
            </button>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default ShoesBlock;
