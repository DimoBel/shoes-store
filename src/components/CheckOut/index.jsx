import React from 'react';
import styles from './CheckOut.module.scss';

const CheckOut = () => {
  return (
    <div className={styles.root}>
      <h1>
        <span>😕</span>
        <br />
        Наразі функціонал недоступний
      </h1>
      <p className={styles.description}>
        Пан Дмитро Білецький реалізує такий функціонал в майбутньому, в рамках кваліфікаційної
        роботи магістра.
      </p>
    </div>
  );
};

export default CheckOut;
