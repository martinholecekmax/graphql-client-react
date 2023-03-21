import { gql } from '@apollo/client';

export const PAGE_INFO_FRAGMENT = gql`
  fragment PageInfoFragment on PageInfo {
    currentPage
    hasNextPage
    hasPreviousPage
    itemCount
    pageCount
    perPage
    totalCount
  }
`;
