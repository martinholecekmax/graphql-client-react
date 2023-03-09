import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

import * as styles from './image.module.css';

const Image = ({ url, alt, onRemove }) => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <img src={url} alt={alt} className={styles.image} />
        <div className={styles.removeButton}>
          <FontAwesomeIcon
            icon={faTrashAlt}
            onClick={onRemove}
            className={styles.icon}
          />
        </div>
      </div>
    </div>
  );
};

export default Image;
