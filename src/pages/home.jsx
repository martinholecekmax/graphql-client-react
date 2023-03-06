import { useMutation, useQuery } from '@apollo/client';
import React from 'react';
import Header from '../components/header/header';
import ProductCard from '../components/product-card/product-card';
import {
  CREATE_PRODUCT,
  GET_PRODUCTS,
  REMOVE_PRODUCT,
} from '../queries/products';

import * as styles from './home.module.css';

const Home = () => {
  const { loading, error, data } = useQuery(GET_PRODUCTS);
  const [removeProduct, { error: removeProductError }] =
    useMutation(REMOVE_PRODUCT);
  const [createProduct, { error: createProductError }] = useMutation(
    CREATE_PRODUCT,
    {
      variables: {
        input: {
          title: 'New product',
          description: 'New product description',
          price: 100,
        },
      },
      refetchQueries: [{ query: GET_PRODUCTS }],
    }
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  if (!data) return <p>Not found</p>;

  const products = data?.allProducts?.map((product) => (
    <ProductCard
      key={product.id}
      product={product}
      removeProduct={removeProduct}
    />
  ));
  return (
    <div className={styles.container}>
      <Header>
        <div className={styles.title}>Home</div>
        <button className={`btn btn-primary`} onClick={createProduct}>
          Create
        </button>
      </Header>
      {createProductError ? (
        <div className='alert alert-danger' role='alert'>
          {createProductError.message}
        </div>
      ) : null}
      {removeProductError ? (
        <div className='alert alert-danger' role='alert'>
          {removeProductError.message}
        </div>
      ) : null}
      <div className={styles.products}>{products}</div>
    </div>
  );
};

export default Home;
