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
