import { useMutation, useQuery } from '@apollo/client';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import moment from 'moment/moment';
import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/button/button';
import CustomTable from '../components/custom-table/custom-table';
import Header from '../components/header/header';
import {
  CREATE_CATEGORY,
  GET_CATEGORIES,
  REMOVE_CATEGORY,
} from '../queries/categories';

import * as styles from './categories.module.css';

const Categories = () => {
  const { loading, error, data } = useQuery(GET_CATEGORIES);

  const [removeCategory, { error: removeCategoryError }] =
    useMutation(REMOVE_CATEGORY);

  const [createCategory, { error: createCategoryError }] = useMutation(
    CREATE_CATEGORY,
    {
      variables: {
        input: {
          title: 'New category',
          path: 'new-category',
          description: 'New category description',
        },
      },
      refetchQueries: [{ query: GET_CATEGORIES }],
    }
  );

  const onRemove = (id) => {
    removeCategory({
      variables: { id },
      refetchQueries: [{ query: GET_CATEGORIES }],
    });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  if (!data) return <p>Not found</p>;

  const categories = data?.allCategories?.map((category) => {
    const description =
      category.description?.length > 100
        ? `${category.description.substring(0, 100)}...`
        : category.description;
    const path = `/categories/${category.id}`;
    const created = moment(category.createdAt).format('DD/MM/YYYY');
    const actions = (
      <div className={styles.actions}>
        <Link to={path} className={styles.link}>
          <FontAwesomeIcon icon={faEdit} className={styles.icon} />
        </Link>
        <div onClick={() => onRemove(category.id)}>
          <FontAwesomeIcon icon={faTrashAlt} className={styles.icon} />
        </div>
      </div>
    );
    return {
      id: category.id,
      title: category.title,
      path: category.path,
      description: description,
      created,
      actions,
    };
  });

  const columns = ['title', 'path', 'description', 'created', 'actions'];

  const headers = ['Title', 'Path', 'Description', 'Created', 'Actions'];

  return (
    <div className={styles.container}>
      <Header>
        <div className={styles.title}>Categories</div>
        <Button onClick={createCategory} variant='primary'>
          Create New Category
        </Button>
      </Header>
      {createCategoryError ? (
        <div className='alert alert-danger' role='alert'>
          {createCategoryError.message}
        </div>
      ) : null}
      {removeCategoryError ? (
        <div className='alert alert-danger' role='alert'>
          {removeCategoryError.message}
        </div>
      ) : null}
      <CustomTable columns={columns} headers={headers} data={categories} />
    </div>
  );
};

export default Categories;
