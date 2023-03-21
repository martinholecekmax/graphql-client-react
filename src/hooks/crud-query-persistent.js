import { useMutation, useQuery } from '@apollo/client';

import useQueryState from './use-query-state';

/**
 * Use this hook to get a list of items from a GraphQL query.
 *
 * It will return the list of items, the current limit,
 * skip and sort, and functions to change the limit, skip and sort.
 *
 * This hook uses the url query string to store the limit, skip and sort.
 */
const useCrudQueryPersistent = ({
  getQuery,
  createQuery,
  removeQuery,
  limit: initialLimit = 5,
  skip: initialSkip = 0,
  sort: initialSort = {
    field: 'title',
    order: 'ASC',
  },
}) => {
  const [query, setQuery] = useQueryState('query');
  const limit = parseInt(query?.limit) || initialLimit;
  const skip = parseInt(query?.skip) || initialSkip;
  const sort = {
    field: query?.sort?.field || initialSort.field,
    order: query?.sort?.order || initialSort.order,
  };

  const {
    loading,
    error: getError,
    data,
    refetch,
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
    const newQuery = { ...query, limit: newLimit, skip: 0 };
    setQuery(newQuery);
  };

  const changePage = (newPage) => {
    if (newPage < 0) return;
    if (newPage > pageInfo.totalCount) return;
    const newQuery = { ...query, skip: newPage };
    setQuery(newQuery);
  };

  const changeSort = ({ field, order }) => {
    const newQuery = { ...query, sort: { field, order } };
    setQuery(newQuery);
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
    refetch,
  };
};

export default useCrudQueryPersistent;
