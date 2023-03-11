import React from 'react';

import * as styles from './text-area.module.css';

const TextArea = ({
  onChange,
  rows = 1,
  field,
  value,
  placeholder,
  label,
  error,
}) => {
  const onInputChange = (e) => {
    onChange({
      field,
      value: e.target.value,
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.label}>{label}</div>
      <textarea
        className={`form-control ${styles.input} ${error ? 'is-invalid' : ''}`}
        type={'text'}
        rows={rows}
        value={value}
        onChange={onInputChange}
        placeholder={placeholder}
      />
      {error ? <div className={styles.error}>{error}</div> : null}
    </div>
  );
};

export default TextArea;
