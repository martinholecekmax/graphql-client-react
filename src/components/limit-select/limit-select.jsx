import React from 'react';

import * as styles from './limit-select.module.css';

const LimitSelect = ({ onChange, limit }) => {
  const handleChange = (e) => {
    const productsPerPage = parseInt(e.target.value) || 5;
    onChange(productsPerPage);
  };

  return (
    <div className={styles.container}>
      <select
        onChange={handleChange}
        value={limit}
        className={`form-select ${styles.selectBox}`}
      >
        <option value={5}>5 items</option>
        <option value={10}>10 items</option>
        <option value={20}>20 items</option>
        <option value={30}>30 items</option>
        <option value={40}>40 items</option>
      </select>
    </div>
  );
};

export default LimitSelect;
