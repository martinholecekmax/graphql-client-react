import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { useMutation, useQuery } from '@apollo/client';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Button from '../components/button/button';
import Images from '../components/images/images';
import StateHandler from '../components/state-handler/state-handler';
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

  const [product, setProduct] = useState(null);
  const [isSaved, setIsSaved] = useState(true);

  const { loading, error, data } = useQuery(GET_PRODUCT, {
    variables: { id },
    networkPolicy: 'cache-and-network',
  });

  const [updateProduct, { error: updateProductError }] =
    useMutation(UPDATE_PRODUCT);

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

  const onRemove = () => {
    removeProduct();
  };

  useEffect(() => {
    if (data) {
      setProduct(data?.product);
    }
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
    setIsSaved(true);
  };

  const handleUpdate = ({ field, value }) => {
    setProduct((prev) => ({
      ...prev,
      [field]: value,
    }));
    setIsSaved(false);
  };

  const isLoading = loading;
  const hasError = error || updateProductError || removeProductError;

  return (
    <div className={styles.container}>
      <div className={styles.actionBar}>
        <FontAwesomeIcon
          icon={faArrowLeft}
          className={styles.back}
          onClick={() => navigate(-1)}
        />
        <h3 className={styles.title}>{product?.title}</h3>
        <div className={styles.buttons}>
          <Button onClick={onSave} variant={isSaved ? 'primary' : 'blue'}>
            Save
          </Button>
          <Button onClick={onRemove} variant='flat'>
            Remove
          </Button>
        </div>
      </div>
      <StateHandler
        isLoading={isLoading}
        hasError={hasError}
        fallbackLoading={<p>Loading...</p>}
        fallbackError={<p>Error :( {error?.message}</p>}
      >
        <div className={styles.content}>
          <TextField
            field='title'
            label='Title'
            value={product?.title}
            onChange={handleUpdate}
          />
          <TextField
            field='path'
            label='Path'
            value={product?.path}
            onChange={handleUpdate}
          />
          <TextField
            field='price'
            label='Price'
            type='number'
            value={product?.price}
            onChange={handleUpdate}
          />
          <TextArea
            field='description'
            label='Description'
            rows={5}
            value={product?.description}
            onChange={handleUpdate}
          />
          <Images imageCollectionId={product?.imageCollection?.id} />
        </div>
      </StateHandler>
    </div>
  );
};

export default Product;
