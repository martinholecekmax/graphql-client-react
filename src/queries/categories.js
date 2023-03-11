import { gql } from '@apollo/client';

export const GET_CATEGORIES = gql`
  query AllCategories {
    allCategories {
      id
      title
      path
      createdAt
      updatedAt
      description
    }
  }
`;

export const GET_CATEGORY = gql`
  query Category($id: ID!) {
    category(id: $id) {
      id
      title
      path
      createdAt
      updatedAt
      description
    }
  }
`;

export const UPDATE_CATEGORY = gql`
  mutation UpdateCategory($input: CategoryInput) {
    updateCategory(input: $input) {
      id
      title
      path
      createdAt
      updatedAt
      description
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
      title
      path
      createdAt
      updatedAt
      description
    }
  }
`;
