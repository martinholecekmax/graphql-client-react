import React from 'react';

import * as styles from './text-field.module.css';

const TextField = ({
  onChange,
  type = 'text',
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
      <input
        className={`form-control ${error ? 'is-invalid' : ''}`}
        type={type}
        value={value}
        onChange={onInputChange}
        placeholder={placeholder}
      />
      {error ? <div className={styles.error}>{error}</div> : null}
    </div>
  );
};

export default TextField;
