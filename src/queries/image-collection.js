import { gql } from '@apollo/client';

export const IMAGE_COLLECTION_FRAGMENT = gql`
  fragment ImageCollectionFragment on ImageCollection {
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
`;

export const GET_IMAGE_COLLECTION = gql`
  ${IMAGE_COLLECTION_FRAGMENT}
  query ImageCollection($id: ID!) {
    imageCollection(id: $id) {
      ...ImageCollectionFragment
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
    }
  }
`;
