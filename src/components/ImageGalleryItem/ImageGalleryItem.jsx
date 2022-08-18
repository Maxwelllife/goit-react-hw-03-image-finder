import React from 'react';
import s from './ImageGalleryItem.module.css';
//data = data.hits
function ImageGalleryItem(props) {
  const { data } = props;
  const { webformatURL, tags } = data;
  return (
    <li className={s.galleryItem}>
      <img width="150" src={webformatURL} alt={tags} loading="lazy" />
    </li>
  );
}

export default ImageGalleryItem;
