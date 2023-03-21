import React from 'react';
import { Link } from 'react-router-dom';

import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import moment from 'moment/moment';

import Button from '../components/button/button';
import CustomTable from '../components/custom-table/custom-table';
import LimitSelect from '../components/limit-select/limit-select';
import Pagination from '../components/pagination/pagination';
import SortSelect from '../components/sort-select/sort-select';
import StateHandler from '../components/state-handler/state-handler';
import useCrudQueryPersistent from '../hooks/crud-query-persistent';
import {
  CREATE_CATEGORY,
  GET_CATEGORIES,
  REMOVE_CATEGORY,
} from '../queries/categories';

import * as styles from './categories.module.css';

const Categories = () => {
  const {
    loading,
    error,
    nodes,
    limit,
    sort,
    changeLimit,
    changeSort,
    pageInfo,
    changePage,
    onRemove,
    onCreate,
  } = useCrudQueryPersistent({
    getQuery: GET_CATEGORIES,
    createQuery: CREATE_CATEGORY,
    removeQuery: REMOVE_CATEGORY,
  });

  const categories = nodes?.map((category) => {
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

  const createCategory = () => {
    const input = {
      title: 'New Category',
      path: 'new-category',
      description: 'New Category Description',
    };
    onCreate(input);
  };

  const columns = ['title', 'path', 'description', 'created', 'actions'];
  const headers = ['Title', 'Path', 'Description', 'Created', 'Actions'];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>Categories</h2>
        <Button onClick={createCategory} variant='primary'>
          Create New Category
        </Button>
      </div>
      <StateHandler
        isLoading={loading}
        hasError={error}
        fallbackLoading={<p>Loading...</p>}
        fallbackError={<p>Error :( {error?.message}</p>}
      >
        <div className={styles.actionBar}>
          <SortSelect
            name='CategorySortableFields'
            sort={sort}
            onChange={changeSort}
          />
          <LimitSelect limit={limit} onChange={changeLimit} />
        </div>
        <CustomTable columns={columns} headers={headers} data={categories} />
        <Pagination pageInfo={pageInfo} changePage={changePage} />
      </StateHandler>
    </div>
  );
};

export default Categories;
