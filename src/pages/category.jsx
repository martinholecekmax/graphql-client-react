import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { useMutation, useQuery } from '@apollo/client';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Button from '../components/button/button';
import StateHandler from '../components/state-handler/state-handler';
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

  const [category, setCategory] = useState({});
  const [isSaved, setIsSaved] = useState(true);

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

  useEffect(() => {
    setCategory(data?.category);
  }, [data]);

  const onSave = () => {
    updateCategory({
      variables: {
        input: {
          id: category.id,
          title: category.title,
          description: category.description,
          path: category.path,
        },
      },
    });
    setIsSaved(true);
  };

  const onRemove = () => {
    removeCategory();
  };

  const handleUpdate = ({ field, value }) => {
    setCategory((prev) => ({
      ...prev,
      [field]: value,
    }));
    setIsSaved(false);
  };

  const isLoading = loading;
  const hasError = error || updateCategoryError || removeCategoryError;

  return (
    <div className={styles.container}>
      <div className={styles.actionBar}>
        <FontAwesomeIcon
          icon={faArrowLeft}
          className={styles.back}
          onClick={() => navigate(-1)}
        />
        <h3 className={styles.title}>{category?.title}</h3>
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
            value={category?.title}
            onChange={handleUpdate}
          />
          <TextField
            field='path'
            label='Path'
            value={category?.path}
            onChange={handleUpdate}
          />
          <TextArea
            field='description'
            label='Description'
            rows={5}
            value={category?.description}
            onChange={handleUpdate}
          />
        </div>
      </StateHandler>
    </div>
  );
};

export default Category;
