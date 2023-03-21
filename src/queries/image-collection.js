import { gql } from '@apollo/client';

export const GET_IMAGE_COLLECTION = gql`
  query ImageCollection($id: ID!) {
    imageCollection(id: $id) {
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
      createdAt
      updatedAt
    }
  }
`;

export const UPLOAD_IMAGE = gql`
  mutation UploadImageToCollection($id: ID!, $image: ImageInput!) {
    uploadImageToImageCollection(id: $id, image: $image) {
      id
    }
  }
`;

export const REMOVE_IMAGE = gql`
  mutation RemoveImageFromCollection($id: ID!, $imageId: ID!) {
    removeImageFromImageCollection(id: $id, imageId: $imageId) {
      id
    }
  }
`;

export const UPDATE_IMAGE = gql`
  mutation UpdateImageInCollection($id: ID!, $image: ImageInput!) {
    updateImageInCollection(id: $id, image: $image) {
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
`;
