import { gql } from '@apollo/client';

export const GET_PRODUCTS = gql`
  query AllProducts($input: ProductConnectionInput) {
    allProducts(input: $input) {
      nodes {
        id
        title
        description
        price
        imageCollection {
          createdAt
          id
          images {
            id
            fileName
            url
            alt
            imageType
            createdAt
            rootDirectory
          }
        }
        createdAt
        updatedAt
        path
      }
      pageInfo {
        currentPage
        hasNextPage
        hasPreviousPage
        itemCount
        pageCount
        perPage
        totalCount
      }
    }
  }
`;

export const GET_PRODUCT = gql`
  query Product($id: ID!) {
    product(id: $id) {
      id
      title
      path
      description
      price
      createdAt
      updatedAt
      imageCollection {
        createdAt
        id
      }
    }
  }
`;

export const REMOVE_PRODUCT = gql`
  mutation RemoveProduct($id: ID!) {
    removeProduct(id: $id) {
      id
      title
      path
      description
      price
    }
  }
`;

export const CREATE_PRODUCT = gql`
  mutation CreateProduct($input: ProductInput) {
    createProduct(input: $input) {
      id
      title
      path
      description
      price
      createdAt
      updatedAt
    }
  }
`;

export const UPDATE_PRODUCT = gql`
  mutation UpdateProduct($input: ProductInput) {
    updateProduct(input: $input) {
      id
      title
      path
      description
      price
      imageCollection {
        createdAt
        id
      }
      createdAt
      updatedAt
    }
  }
`;
