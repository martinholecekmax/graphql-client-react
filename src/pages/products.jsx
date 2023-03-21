import React from 'react';
import { Link } from 'react-router-dom';

import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Button from '../components/button/button';
import CustomTable from '../components/custom-table/custom-table';
import LimitSelect from '../components/limit-select/limit-select';
import Pagination from '../components/pagination/pagination';
import SortSelect from '../components/sort-select/sort-select';
import StateHandler from '../components/state-handler/state-handler';
import Thumbnail from '../components/thumbnail/thumbnail';
import useCrudQueryPersistent from '../hooks/crud-query-persistent';
import {
  CREATE_PRODUCT,
  GET_PRODUCTS,
  REMOVE_PRODUCT,
} from '../queries/products';

import * as styles from './products.module.css';

const ProductsPage = () => {
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
    refetch,
  } = useCrudQueryPersistent({
    getQuery: GET_PRODUCTS,
    createQuery: CREATE_PRODUCT,
    removeQuery: REMOVE_PRODUCT,
  });

  const products = nodes?.map((product) => {
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

  const createCategory = () => {
    onCreate({
      title: 'New Product',
      path: 'new-product',
      description: 'New Product Description',
      price: 0,
    });
  };

  // Subscriptions
  // const { data: createProductData, loading: createProductLoading } =
  //   useSubscription(PRODUCT_CREATE_SUBSCRIPTION);
  // const { data: updateProductData, loading: updateProductLoading } =
  //   useSubscription(PRODUCT_UPDATE_SUBSCRIPTION);
  // const { data: removeProductData, loading: removeProductLoading } =
  //   useSubscription(PRODUCT_REMOVE_SUBSCRIPTION);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>Products</h2>
        <Button onClick={createCategory} variant='primary'>
          Create New Product
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
            name='ProductSortableFields'
            sort={sort}
            onChange={changeSort}
          />
          <LimitSelect limit={limit} onChange={changeLimit} />
        </div>
        <CustomTable columns={columns} headers={headers} data={products} />
        <Pagination pageInfo={pageInfo} changePage={changePage} />
      </StateHandler>
    </div>
  );
};

export default ProductsPage;
