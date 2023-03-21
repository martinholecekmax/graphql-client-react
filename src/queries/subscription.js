import { gql } from '@apollo/client';

export const PRODUCT_UPDATE_SUBSCRIPTION = gql`
  subscription ProductUpdateSubscription {
    productUpdated {
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
  }
`;

export const PRODUCT_CREATE_SUBSCRIPTION = gql`
  subscription ProductCreateSubscription {
    productAdded {
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
  }
`;
