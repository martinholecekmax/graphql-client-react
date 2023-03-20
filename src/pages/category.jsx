import { useMutation, useQuery } from '@apollo/client';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '../components/button/button';
import TextArea from '../components/text-area/text-area';
import TextField from '../components/text-field/text-field';
import {
  GET_CATEGORIES,
  GET_CATEGORY,
  REMOVE_CATEGORY,
  UPDATE_CATEGORY,
} from '../queries/categories';

import * as styles from './category.module.css';

const Category = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const { loading, error, data } = useQuery(GET_CATEGORY, {
    variables: { id },
  });

  const [updateCategory, { error: updateCategoryError }] =
    useMutation(UPDATE_CATEGORY);

  const [removeCategory, { error: removeCategoryError }] = useMutation(
    REMOVE_CATEGORY,
    {
      variables: { id },
      refetchQueries: [{ query: GET_CATEGORIES }],
      update: () => {
        navigate('/categories');
      },
    }
  );

  const handleUpdate = ({ field, value }) => {
    updateCategory({
      variables: {
        input: {
          id: category.id,
          [field]: value,
        },
      },
    });
  };

  const onRemove = () => {
    removeCategory();
  };

  if (loading) return <p>Loading...</p>;
  if (error || updateCategoryError || removeCategoryError) {
    return <p>Error :(</p>;
  }

  const category = data?.category || {};

  return (
    <div className={styles.container}>
      <div className={styles.actionBar}>
        <FontAwesomeIcon
          icon={faArrowLeft}
          className={styles.back}
          onClick={() => navigate(-1)}
        />
        <h3 className={styles.title}>{category.title}</h3>
        <div className={styles.buttons}>
          <Button onClick={onRemove} variant='flat'>
            Remove
          </Button>
        </div>
      </div>
      <div className={styles.content}>
        <TextField
          field='title'
          label='Title'
          value={category.title}
          onChange={handleUpdate}
        />
        <TextField
          field='path'
          label='Path'
          value={category.path}
          onChange={handleUpdate}
        />
        <TextArea
          field='description'
          label='Description'
          rows={5}
          value={category.description}
          onChange={handleUpdate}
        />
      </div>
    </div>
  );
};

export default Category;
