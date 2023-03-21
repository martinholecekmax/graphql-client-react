import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { useMutation, useQuery } from '@apollo/client';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Button from '../components/button/button';
import Images from '../components/images/images';
import TextArea from '../components/text-area/text-area';
import TextField from '../components/text-field/text-field';
import {
  GET_PRODUCT,
  GET_PRODUCTS,
  REMOVE_PRODUCT,
  UPDATE_PRODUCT,
} from '../queries/products';

import * as styles from './product.module.css';

const Product = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [product, setProduct] = useState({});
  const { loading, error, data } = useQuery(GET_PRODUCT, {
    variables: { id },
    networkPolicy: 'cache-and-network',
  });

  const [removeProduct, { error: removeProductError }] = useMutation(
    REMOVE_PRODUCT,
    {
      variables: { id },
      refetchQueries: [{ query: GET_PRODUCTS }],
      update: () => {
        navigate('/products');
      },
    }
  );

  const [updateProduct, { error: updateProductError }] =
    useMutation(UPDATE_PRODUCT);

  const onRemove = () => {
    removeProduct();
  };

  useEffect(() => {
    setProduct(data?.product);
  }, [data]);

  const onSave = () => {
    const price = parseFloat(product.price);
    updateProduct({
      variables: {
        input: {
          id: product.id,
          title: product.title,
          description: product.description,
          path: product.path,
          price,
        },
      },
    });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  if (!product) return <p>Not found</p>;

  const handleUpdate = ({ field, value }) => {
    setProduct((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className={styles.container}>
      <div className={styles.actionBar}>
        <FontAwesomeIcon
          icon={faArrowLeft}
          className={styles.back}
          onClick={() => navigate(-1)}
        />
        <h3 className={styles.title}>{product.title}</h3>
        <div className={styles.buttons}>
          <Button onClick={onSave} variant='primary'>
            Save
          </Button>
          <Button onClick={onRemove} variant='flat'>
            Remove
          </Button>
        </div>
      </div>
      {removeProductError ? (
        <div className='alert alert-danger' role='alert'>
          {removeProductError.message}
        </div>
      ) : null}
      {updateProductError ? (
        <div className='alert alert-danger' role='alert'>
          {updateProductError.message}
        </div>
      ) : null}
      <div className={styles.content}>
        <TextField
          field='title'
          label='Title'
          value={product.title}
          onChange={handleUpdate}
        />
        <TextField
          field='path'
          label='Path'
          value={product.path}
          onChange={handleUpdate}
        />
        <TextField
          field='price'
          label='Price'
          type='number'
          value={product.price}
          onChange={handleUpdate}
        />
        <TextArea
          field='description'
          label='Description'
          rows={5}
          value={product.description}
          onChange={handleUpdate}
        />
        <Images imageCollectionId={product.imageCollection?.id} />
      </div>
    </div>
  );
};

export default Product;
