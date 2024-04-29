import React from 'react';
import axios from 'axios';

import { useParams, useNavigate } from 'react-router-dom';
import { addItem } from '../redux/slices/cartSlice';
import { useDispatch } from 'react-redux';

import loading from '../assets/img/loading.gif';

const Product = () => {
  const [shoes, setShoes] = React.useState([]);
  const [activeSize, setActiveSize] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(true);

  const { id } = useParams();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  React.useEffect(() => {
    async function fetchShoes() {
      try {
        const { data } = await axios.get('https://66264d33052332d55322633f.mockapi.io/items/' + id);
        setShoes(data);
      } catch (error) {
        alert('Помилка при отриманні товару!');
        navigate('/');
      } finally {
        setIsLoading(false);
      }
    }
    fetchShoes();
  }, []);

  if (!shoes) {
    return 'Загрузка...';
  }
  if (isLoading) {
    return (
      <div className="container">
        <img
          src={loading}
          style={{ width: '100px', height: '100px', display: 'block', margin: '0 auto' }}
          alt="Завантаження сторінки"
        />
      </div>
    );
  }
  const onClickAdd = () => {
    const { id, title, price, imageUrl, sizes } = shoes;
    const item = {
      id,
      title,
      price,
      imageUrl,
      size: sizes[activeSize],
    };
    dispatch(addItem(item));
  };

  return (
    <div className="container__product">
      <div className="image-container">
        <img src={shoes.imageUrl} alt="Зображення товару" />
      </div>
      <div className="info-container">
        <h1>{shoes.title}</h1>
        <h2>Ціна: {shoes.price} ₴</h2>
        <h3>Оберіть розмір:</h3>
        <div className="shoes-block">
          <div className="size-selector">
            <div className="shoes-block__selector">
              <ul>
                {shoes.sizes &&
                  shoes.sizes.map((size, i) => (
                    <li
                      key={size}
                      onClick={() => setActiveSize(i)}
                      className={activeSize === i ? 'active' : ''}>
                      {size}
                    </li>
                  ))}
              </ul>
            </div>
            <div className="shoes-block__bottom">
              <button
                onClick={() => onClickAdd(shoes)}
                className="button button--outline button--add">
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                    fill="white"
                  />
                </svg>
                <span>В кошик</span>
              </button>
            </div>
          </div>
        </div>
        <h3>Опис:</h3>
        <p>{shoes.description}</p>
      </div>
    </div>
  );
};

export default Product;
