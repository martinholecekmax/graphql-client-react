import { gql } from '@apollo/client';

import { PAGE_INFO_FRAGMENT } from './page-info';

export const CATEGORY_FRAGMENT = gql`
  fragment CategoryFragment on Category {
    id
    title
    path
    createdAt
    updatedAt
    description
  }
`;

export const GET_CATEGORIES = gql`
  ${CATEGORY_FRAGMENT}
  ${PAGE_INFO_FRAGMENT}
  query AllCategories($input: CategoryConnectionInput) {
    allCategories(input: $input) {
      nodes {
        ...CategoryFragment
        productCollection {
          id
        }
      }
      pageInfo {
        ...PageInfoFragment
      }
    }
  }
`;

export const GET_CATEGORY = gql`
  ${CATEGORY_FRAGMENT}
  query Category($id: ID!) {
    category(id: $id) {
      ...CategoryFragment
      productCollection {
        id
      }
    }
  }
`;

export const UPDATE_CATEGORY = gql`
  mutation UpdateCategory($input: CategoryInput) {
    updateCategory(input: $input) {
      id
    }
  }
`;

export const REMOVE_CATEGORY = gql`
  mutation RemoveCategory($id: ID!) {
    removeCategory(id: $id) {
      id
    }
  }
`;

export const CREATE_CATEGORY = gql`
  mutation CreateCategory($input: CategoryInput) {
    createCategory(input: $input) {
      id
    }
  }
`;
