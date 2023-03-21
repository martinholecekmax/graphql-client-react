import React from 'react';

import PropTypes from 'prop-types';

import * as styles from './text-field.module.css';

const TextField = ({
  onChange,
  type,
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
        className={`form-control ${styles.input} ${error ? 'is-invalid' : ''}`}
        type={type}
        value={value || ''}
        onChange={onInputChange}
        placeholder={placeholder}
      />
      {error ? <div className={styles.error}>{error}</div> : null}
    </div>
  );
};

TextField.defaultProps = {
  type: 'text',
  containerClass: '',
  label: '',
  placeholder: '',
  value: '',
  field: '',
  error: '',
  onChange: () => {},
  onBlur: () => {},
};

TextField.propTypes = {
  containerClass: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  field: PropTypes.string,
  error: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
};

export default TextField;
