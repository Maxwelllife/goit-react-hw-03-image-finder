import React from 'react';
import s from './Button.module.css';
import PropTypes from 'prop-types';

function Button({ onClick, pages }) {
  if (pages > 1) {
    return (
      <button onClick={onClick} className={s.button} type="button">
        Load more
      </button>
    );
  }
}

Button.porpTypes = {
  obClick: PropTypes.func.isRequired,
  pages: PropTypes.number.isRequired,
};

export default Button;
