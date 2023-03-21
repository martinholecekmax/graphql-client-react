import { gql } from '@apollo/client';

export const PRODUCT_UPDATE_SUBSCRIPTION = gql`
  subscription ProductUpdateSubscription {
    productUpdated {
      id
      title
      description
      price
      createdAt
      updatedAt
      path
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
      createdAt
      updatedAt
      path
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
    }
  }
`;

export const PRODUCT_REMOVE_SUBSCRIPTION = gql`
  subscription ProductRemoveSubscription {
    productRemoved {
      id
      title
      description
      price
      createdAt
      updatedAt
      path
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
    }
  }
`;
