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
  mutation UploadImageToCollection($id: ID!, $file: Upload!, $alt: String) {
    uploadImageToImageCollection(id: $id, file: $file, alt: $alt) {
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
  mutation UpdateImage($id: ID!, $file: Upload, $alt: String) {
    updateImage(id: $id, file: $file, alt: $alt) {
      id
      fileName
      url
      alt
      imageType
      createdAt
      rootDirectory
    }
  }
`;
