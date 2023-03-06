import { useMutation, useQuery } from '@apollo/client';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../components/header/header';
import ImageUpload from '../components/image-upload/image-upload';
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
  });

  const [removeProduct, { error: removeProductError }] = useMutation(
    REMOVE_PRODUCT,
    {
      variables: { id },
      refetchQueries: [{ query: GET_PRODUCTS }],
      update: () => {
        navigate('/');
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
          images: product.images,
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
      <Header>
        <div className={styles.header}>
          <FontAwesomeIcon
            icon={faArrowLeft}
            className={styles.back}
            onClick={() => navigate(-1)}
          />
          <div className={styles.title}>{product.title}</div>
        </div>
        <div className={styles.buttons}>
          <button onClick={onSave} className={`btn btn-success`}>
            Save
          </button>
          <button onClick={onRemove} className={`btn btn-danger`}>
            Remove
          </button>
        </div>
      </Header>
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
        <ImageUpload
          field='images'
          label='Images'
          images={product.images}
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
      </div>
    </div>
  );
};

export default Product;
