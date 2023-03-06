import React from 'react';

import * as styles from './header.module.css';

const Header = ({ children }) => {
  return <div className={styles.container}>{children}</div>;
};

export default Header;
