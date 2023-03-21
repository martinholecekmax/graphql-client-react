import { gql } from '@apollo/client';

import { IMAGE_COLLECTION_FRAGMENT } from './image-collection';
import { PAGE_INFO_FRAGMENT } from './page-info';

// Product Fragment
export const PRODUCT_FRAGMENT = gql`
  fragment ProductFragment on Product {
    id
    title
    description
    price
    createdAt
    updatedAt
    path
  }
`;

export const GET_PRODUCTS = gql`
  ${PRODUCT_FRAGMENT}
  ${IMAGE_COLLECTION_FRAGMENT}
  ${PAGE_INFO_FRAGMENT}
  query AllProducts($input: ProductConnectionInput) {
    allProducts(input: $input) {
      nodes {
        ...ProductFragment
        imageCollection {
          ...ImageCollectionFragment
        }
      }
      pageInfo {
        ...PageInfoFragment
      }
    }
  }
`;

export const GET_PRODUCT = gql`
  ${PRODUCT_FRAGMENT}
  query Product($id: ID!) {
    product(id: $id) {
      ...ProductFragment
      imageCollection {
        id
      }
    }
  }
`;

export const REMOVE_PRODUCT = gql`
  mutation RemoveProduct($id: ID!) {
    removeProduct(id: $id) {
      id
    }
  }
`;

export const CREATE_PRODUCT = gql`
  mutation CreateProduct($input: ProductInput) {
    createProduct(input: $input) {
      id
    }
  }
`;

export const UPDATE_PRODUCT = gql`
  mutation UpdateProduct($input: ProductInput) {
    updateProduct(input: $input) {
      id
    }
  }
`;
