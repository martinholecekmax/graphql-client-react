import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

import * as styles from './navbar.module.css';

const Navbar = () => {
  return (
    <div className={styles.container}>
      <div className={styles.navbar}>
        <div className={styles.links}>
          <NavLink to='/' className={styles.link}>
            Home
          </NavLink>
          <NavLink to='/products' className={styles.link}>
            Products
          </NavLink>
          <NavLink to='/categories' className={styles.link}>
            Categories
          </NavLink>
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default Navbar;
