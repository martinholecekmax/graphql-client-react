import React from 'react';

import * as styles from './image-upload.module.css';

const ImageUpload = ({ onChange, field, images }) => {
  return (
    <div className={styles.container}>
      <div className={styles.title}></div>
      <div className={styles.content}></div>
    </div>
  );
};

export default ImageUpload;
