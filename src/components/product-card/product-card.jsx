import {
  faEdit,
  faEye,
  faRemove,
  faTrashAlt,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Link } from 'react-router-dom';
import { GET_PRODUCTS } from '../../queries/products';

import * as styles from './product-card.module.css';

const ProductCard = ({ product, removeProduct }) => {
  console.log('product', product);
  const onRemove = () => {
    removeProduct({
      variables: { id: product.id },
      refetchQueries: [{ query: GET_PRODUCTS }],
    });
  };
  const image = product.images[0] || {};
  const path = `/product/${product.id}`;
  return (
    <div className={styles.container}>
      <img
        src={image.url || 'https://via.placeholder.com/150'}
        alt={image.alt}
        className={styles.image}
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = 'https://via.placeholder.com/150';
        }}
      />
      <div className={styles.content}>
        <h3 className={styles.title}>{product.title}</h3>
        <div className={styles.description}>{product.description}</div>
        <div className={styles.price}>£{product.price?.toFixed(2)}</div>
        <div className={styles.buttons}>
          <Link to={path} className={styles.link}>
            <FontAwesomeIcon icon={faEdit} className={styles.icon} />
          </Link>
          <div onClick={onRemove}>
            <FontAwesomeIcon icon={faTrashAlt} className={styles.icon} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
