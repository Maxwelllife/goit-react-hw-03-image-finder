import React from 'react';
import { Triangle } from 'react-loader-spinner';
import s from './Loader.module.css';

function Loader() {
  return (
    <div className={s.loader}>
      <Triangle color="#00BFFF" height={80} width={80} />
    </div>
  );
}

export default Loader;
