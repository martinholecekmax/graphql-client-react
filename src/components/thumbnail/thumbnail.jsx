import React from 'react';

import * as styles from './thumbnail.module.css';

const Thumbnail = ({ url, alt }) => {
  return (
    <img
      src={url || 'https://via.placeholder.com/150'}
      alt={alt}
      className={styles.image}
      onError={(e) => {
        e.target.onerror = null;
        e.target.src = 'https://via.placeholder.com/150';
      }}
    />
  );
};

export default Thumbnail;
