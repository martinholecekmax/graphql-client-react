import { useMutation, useQuery } from '@apollo/client';
import { useState } from 'react';
import {
  CREATE_PRODUCT,
  GET_PRODUCTS,
  REMOVE_PRODUCT,
} from '../queries/products';

const useProducts = () => {
  const [limit, setLimit] = useState(5);
  const [skip, setSkip] = useState(0);
  const [sort, setSort] = useState({
    field: 'title',
    order: 'DESC',
  });

  const {
    loading,
    error: getProductsError,
    data,
  } = useQuery(GET_PRODUCTS, {
    variables: {
      input: {
        limit,
        skip,
        sort,
      },
    },
    fetchPolicy: 'cache-and-network',
  });

  const [removeProduct, { error: removeProductError }] =
    useMutation(REMOVE_PRODUCT);

  const [onCreateProduct, { error: createProductError }] = useMutation(
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
      refetchQueries: [
        { query: GET_PRODUCTS, variables: { input: { limit, skip, sort } } },
      ],
    }
  );

  const nodes = data?.allProducts?.nodes || [];
  const pageInfo = data?.allProducts?.pageInfo || {};

  const onRemove = (id) => {
    removeProduct({
      variables: { id },
      refetchQueries: [
        { query: GET_PRODUCTS, variables: { input: { limit, skip, sort } } },
      ],
    });
  };
  const changeLimit = (newLimit) => {
    setLimit(newLimit);
  };

  const changePage = (newPage) => {
    setSkip(newPage);
  };

  const changeSort = ({ field, order }) => {
    setSort({
      field,
      order,
    });
  };

  const error = getProductsError || removeProductError || createProductError;

  return {
    loading,
    error,
    nodes,
    limit,
    skip,
    sort,
    pageInfo,
    changeLimit,
    changePage,
    changeSort,
    onRemove,
    onCreateProduct,
  };
};

export default useProducts;
