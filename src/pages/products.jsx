import { useMutation, useQuery } from '@apollo/client';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Link } from 'react-router-dom';
import CustomTable from '../components/custom-table/custom-table';
import Header from '../components/header/header';
import {
  CREATE_PRODUCT,
  GET_PRODUCTS,
  REMOVE_PRODUCT,
} from '../queries/products';

import * as styles from './products.module.css';

const ProductsPage = () => {
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

  const onRemove = (id) => {
    removeProduct({
      variables: { id },
      refetchQueries: [{ query: GET_PRODUCTS }],
    });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  if (!data) return <p>Not found</p>;

  const products = data?.allProducts?.map((product) => {
    const imageCollection = product.imageCollection || {};
    const firstImage = imageCollection.images[0] || {};
    const thumbnail = (
      <img
        src={firstImage.url || 'https://via.placeholder.com/150'}
        alt={firstImage.alt}
        className={styles.image}
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = 'https://via.placeholder.com/150';
        }}
      />
    );
    const path = `/products/${product.id}`;

    const actions = (
      <div className={styles.actions}>
        <Link to={path} className={styles.link}>
          <FontAwesomeIcon icon={faEdit} className={styles.icon} />
        </Link>
        <div onClick={onRemove}>
          <FontAwesomeIcon icon={faTrashAlt} className={styles.icon} />
        </div>
      </div>
    );

    const description =
      product.description?.length > 100
        ? `${product.description.substring(0, 100)}...`
        : product.description;

    const price = `£${product.price?.toFixed(2)}`;

    return {
      ...product,
      thumbnail,
      description,
      price,
      actions,
    };
  });

  const columns = ['thumbnail', 'title', 'description', 'price', 'actions'];

  const headers = ['Thumbnail', 'Title', 'Description', 'Price', 'Actions'];

  return (
    <div className={styles.container}>
      <Header>
        <div className={styles.title}>Products</div>
        <button className={`btn btn-primary`} onClick={createProduct}>
          Create New Product
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
      <CustomTable columns={columns} headers={headers} data={products} />
    </div>
  );
};

export default ProductsPage;
