import React, { useState } from 'react';

import { useMutation, useQuery } from '@apollo/client';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
  GET_IMAGE_COLLECTION,
  REMOVE_IMAGE,
  UPDATE_IMAGE,
  UPLOAD_IMAGE,
} from '../../queries/image-collection';
import Button from '../button/button';
import CustomModal from '../custom-modal/custom-modal';
import CustomTable from '../custom-table/custom-table';
import TextField from '../text-field/text-field';
import Thumbnail from '../thumbnail/thumbnail';
import ImageUpload from './image-upload/image-upload';
import Image from './image/image';

import * as styles from './images.module.css';

const Images = ({ imageCollectionId }) => {
  const {
    loading,
    error: errorCollection,
    data,
  } = useQuery(GET_IMAGE_COLLECTION, {
    variables: { id: imageCollectionId },
  });

  const [removeImage] = useMutation(REMOVE_IMAGE);
  const [uploadImage] = useMutation(UPLOAD_IMAGE);
  const [updateImage] = useMutation(UPDATE_IMAGE);

  const [showModal, setShowModal] = useState(false);
  const [image, setImage] = useState({});
  const [error, setError] = useState(null);

  const onSave = () => {
    if (!image.file && !image.url) {
      setError('Please upload an image');
      return;
    }
    if (image.id) {
      // Update existing image
      const variables = {
        id: imageCollectionId,
        image: {
          id: image.id,
          alt: image.alt,
        },
      };
      if (image.file) {
        variables.image.file = image.file;
      }
      updateImage({
        variables,
        refetchQueries: [
          {
            query: GET_IMAGE_COLLECTION,
            variables: { id: imageCollectionId },
          },
        ],
      });
      onClose();
    } else {
      // Upload new image
      if (image.file) {
        uploadImage({
          variables: {
            id: imageCollectionId,
            image: {
              file: image.file,
              alt: image.alt,
            },
          },
          refetchQueries: [
            {
              query: GET_IMAGE_COLLECTION,
              variables: { id: imageCollectionId },
            },
          ],
        });
        onClose();
      } else {
        setError('Please upload an image');
      }
    }
  };

  const onClose = () => {
    setImage({});
    setError(null);
    setShowModal(false);
  };

  const onRemove = (image) => {
    removeImage({
      variables: { imageId: image.id, id: imageCollectionId },
      refetchQueries: [
        {
          query: GET_IMAGE_COLLECTION,
          variables: { id: imageCollectionId },
        },
      ],
    });
  };

  const onEdit = (image) => {
    setImage(image);
    setShowModal(true);
  };

  const onAdd = () => {
    setImage({});
    setShowModal(true);
  };

  const onImageChange = ({ field, value }) => {
    setImage({
      ...image,
      [field]: value,
    });
    setError(null);
  };

  const clearImage = () => {
    setImage({
      ...image,
      file: null,
      url: '',
    });
  };

  if (loading) return <div>Loading...</div>;
  if (errorCollection) return <div>Error :(</div>;

  const images = data?.imageCollection?.images;
  const tableData = images?.map((image) => {
    const thumbnail = <Thumbnail url={image.url} alt={image.alt} />;
    const actions = (
      <div className={styles.actions}>
        <div onClick={() => onEdit(image)}>
          <FontAwesomeIcon icon={faEdit} className={styles.icon} />
        </div>
        <div onClick={() => onRemove(image)}>
          <FontAwesomeIcon icon={faTrashAlt} className={styles.icon} />
        </div>
      </div>
    );
    return {
      ...image,
      thumbnail,
      actions,
    };
  });

  const columns = ['thumbnail', 'url', 'alt', 'actions'];
  const headers = ['Thumbnail', 'Url', 'Alt', 'Actions'];
  const url = image.file ? URL.createObjectURL(image.file) : image.url;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3>Images</h3>
        <Button onClick={onAdd} variant='primary'>
          Add New Image
        </Button>
      </div>
      <CustomTable data={tableData} columns={columns} headers={headers} />
      <CustomModal
        show={showModal}
        image={image}
        onSave={onSave}
        onClose={onClose}
        isDisabled={false}
      >
        {url ? (
          <Image url={url} alt={image?.alt} onRemove={clearImage} />
        ) : (
          <ImageUpload field='file' onChange={onImageChange} error={error} />
        )}
        {error ? <div className='alert alert-danger'>{error}</div> : null}
        <TextField
          label='Alt'
          value={image.alt}
          onChange={onImageChange}
          field='alt'
        />
      </CustomModal>
    </div>
  );
};

export default Images;
