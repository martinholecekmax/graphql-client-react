import { useMutation, useQuery } from '@apollo/client';
import { useState } from 'react';
import {
  CREATE_CATEGORY,
  GET_CATEGORIES,
  REMOVE_CATEGORY,
} from '../queries/categories';

const useCategories = () => {
  const [limit, setLimit] = useState(5);
  const [skip, setSkip] = useState(0);
  const [sort, setSort] = useState({
    field: 'title',
    order: 'DESC',
  });

  const {
    loading,
    error: getError,
    data,
  } = useQuery(GET_CATEGORIES, {
    variables: {
      input: {
        limit,
        skip,
        sort,
      },
    },
    fetchPolicy: 'cache-and-network',
  });

  const [removeCategory, { error: removeError }] = useMutation(REMOVE_CATEGORY);

  const [onCreate, { error: createError }] = useMutation(CREATE_CATEGORY, {
    variables: {
      input: {
        title: 'New category',
        path: 'new-category',
        description: 'New category description',
      },
    },
    refetchQueries: [
      { query: GET_CATEGORIES, variables: { input: { limit, skip, sort } } },
    ],
  });

  const nodes = data?.allCategories?.nodes || [];
  const pageInfo = data?.allCategories?.pageInfo || {};

  const onRemove = (id) => {
    removeCategory({
      variables: { id },
      refetchQueries: [
        { query: GET_CATEGORIES, variables: { input: { limit, skip, sort } } },
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

  const error = getError || removeError || createError;

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
    onCreate,
  };
};

export default useCategories;
