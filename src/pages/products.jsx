import { useMutation, useQuery } from '@apollo/client';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/button/button';
import CustomTable from '../components/custom-table/custom-table';
import Header from '../components/header/header';
import Thumbnail from '../components/thumbnail/thumbnail';
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
          path: 'new-product',
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
    const thumbnail = <Thumbnail url={firstImage.url} alt={firstImage.alt} />;
    const path = `/products/${product.id}`;

    const actions = (
      <div className={styles.actions}>
        <Link to={path} className={styles.link}>
          <FontAwesomeIcon icon={faEdit} className={styles.icon} />
        </Link>
        <div onClick={() => onRemove(product.id)}>
          <FontAwesomeIcon icon={faTrashAlt} className={styles.icon} />
        </div>
      </div>
    );

    const description =
      product.description?.length > 100
        ? `${product.description.substring(0, 100)}...`
        : product.description;

    const price = `??${product.price?.toFixed(2)}`;

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
        <Button onClick={createProduct} variant='primary'>
          Create New Product
        </Button>
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
