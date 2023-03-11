import React from 'react';
import PropTypes from 'prop-types';

import * as styles from './button.module.css';

const Button = ({ children, onClick, disabled, variant, ...props }) => {
  let className = styles.primary;
  switch (variant) {
    case 'primary':
      className = styles.primary;
      break;
    case 'secondary':
      className = styles.secondary;
      break;
    case 'blue':
      className = styles.blue;
      break;
    case 'danger':
      className = styles.danger;
      break;
    case 'success':
      className = styles.success;
      break;
    case 'flat':
      className = styles.flat;
      break;
    case 'tertiary':
      className = styles.tertiary;
      break;
    default:
      className = styles.primary;
      break;
  }

  return (
    <button
      className={`${styles.button} ${className}`}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

Button.defaultProps = {
  variant: 'primary',
  disabled: false,
  onClick: () => {},
};

Button.propTypes = {
  variant: PropTypes.oneOf([
    'primary',
    'secondary',
    'blue',
    'danger',
    'success',
    'flat',
    'tertiary',
  ]),
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
};

export default Button;
