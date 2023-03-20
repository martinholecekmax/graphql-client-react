import React from 'react';

import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import Button from '../components/button/button';
import CustomTable from '../components/custom-table/custom-table';
import LimitSelect from '../components/limit-select/limit-select';
import Pagination from '../components/pagination/pagination';
import StateHandler from '../components/state-handler/state-handler';
import Thumbnail from '../components/thumbnail/thumbnail';
import useProducts from '../hooks/products';

import * as styles from './products.module.css';
import SortSelect from '../components/sort-select/sort-select';

const ProductsPage = () => {
  const {
    loading,
    error,
    nodes,
    pageInfo,
    limit,
    sort,
    changePage,
    changeLimit,
    changeSort,
    onRemove,
    onCreateProduct,
  } = useProducts();

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

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>Products</h2>
        <Button onClick={onCreateProduct} variant='primary'>
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
