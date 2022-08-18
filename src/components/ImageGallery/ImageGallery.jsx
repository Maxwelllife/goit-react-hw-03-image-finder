import { ImageGalleryItem } from 'components';
import React from 'react';
import s from './ImageGallery.module.css';

function ImageGallery({ hits }) {
  return (
    <ul className={s.gallery}>
      <ImageGalleryItem data={hits} />
    </ul>
  );
}

export default ImageGallery;
