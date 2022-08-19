import { ImageGalleryItem } from 'components';
import React from 'react';
import s from './ImageGallery.module.css';
import PropTypes from 'prop-types';

function ImageGallery({ hits, onItemClick }) {
  const elements = hits.map(element => (
    <ImageGalleryItem
      key={element.id}
      {...element}
      onImageClick={onItemClick}
    />
  ));
  return <ul className={s.gallery}>{elements}</ul>;
}

ImageGallery.propTypes = {
  hits: PropTypes.arrayOf(PropTypes.shape()),
  onItemClick: PropTypes.func,
};

export default ImageGallery;
