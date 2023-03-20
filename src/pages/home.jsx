import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/button/button';

import * as styles from './home.module.css';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Welcome to my GraphQL Demo using React!</h1>
      <p className={styles.description}>
        This website serves as a demo of GraphQL operations using React. With
        GraphQL, you can easily manage your application&apos;s data and state
        using a powerful and flexible language for querying and mutating data.
        This demo focuses on products and categories CRUD operations.
      </p>
      <p className={styles.description}>
        Users can create, read, update, and delete products and categories
        through a user-friendly interface. Additionally, users can upload images
        for products to enhance their appearance and provide more information to
        customers.
      </p>
      <p className={styles.description}>
        This is an exciting demo that will teach you the skills you need to
        build modern web applications using the latest technologies. You&apos;ll
        learn how to use React and GraphQL to create dynamic, responsive user
        interfaces that manage and display data from a server in real-time.
      </p>
      <div className={styles.buttons}>
        <Button onClick={() => navigate('/products')} variant='primary'>
          GO TO PRODUCTS
        </Button>
        <Button onClick={() => navigate('/categories')} variant='primary'>
          GO TO CATEGORIES
        </Button>
      </div>
    </div>
  );
};

export default Home;
