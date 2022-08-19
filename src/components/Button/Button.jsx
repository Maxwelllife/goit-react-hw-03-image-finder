import React from 'react';
import s from './Button.module.css';

function Button({ onClick, pages }) {
  if (pages > 1) {
    return (
      <button onClick={onClick} className={s.button} type="button">
        Load more
      </button>
    );
  }
}

export default Button;
