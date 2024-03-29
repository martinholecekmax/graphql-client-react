import { useState } from 'react';

import { useMutation, useQuery } from '@apollo/client';

/**
 * Use this hook to get a list of items from a GraphQL query.
 *
 * It will return the list of items, the current limit,
 * skip and sort, and functions to change the limit, skip and sort.
 *
 * This hook uses the local state to store the limit, skip and sort.
 */
const useCrudQuery = ({
  getQuery,
  createQuery,
  removeQuery,
  limit: initialLimit = 5,
  skip: initialSkip = 0,
  sort: initialSort = {
    field: 'title',
    order: 'DESC',
  },
}) => {
  const [limit, setLimit] = useState(initialLimit);
  const [skip, setSkip] = useState(initialSkip);
  const [sort, setSort] = useState(initialSort);

  const {
    loading,
    error: getError,
    data,
  } = useQuery(getQuery, {
    variables: {
      input: {
        limit,
        skip,
        sort,
      },
    },
    fetchPolicy: 'cache-and-network',
  });

  const [removeMutation, { error: removeError }] = useMutation(removeQuery);
  const [createMutation, { error: createError }] = useMutation(createQuery);

  const onCreate = (input) => {
    createMutation({
      variables: {
        input,
      },
      refetchQueries: [
        { query: getQuery, variables: { input: { limit, skip, sort } } },
      ],
    });
  };

  const onRemove = (id) => {
    removeMutation({
      variables: { id },
      refetchQueries: [
        { query: getQuery, variables: { input: { limit, skip, sort } } },
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

  let nodes = [];
  let pageInfo = {};
  if (data && data[Object.keys(data)[0]]) {
    nodes = data[Object.keys(data)[0]].nodes || [];
    pageInfo = data[Object.keys(data)[0]].pageInfo || {};
  }

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

export default useCrudQuery;
