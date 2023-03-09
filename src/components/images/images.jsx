import { useMutation, useQuery } from '@apollo/client';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import {
  GET_IMAGE_COLLECTION,
  UPLOAD_IMAGE,
} from '../../queries/image-collection';
import CustomModal from '../custom-modal/custom-modal';
import CustomTable from '../custom-table/custom-table';
import ImageUpload from '../image-upload/image-upload';
import TextField from '../text-field/text-field';

import * as styles from './images.module.css';

const Images = ({ imageCollectionId }) => {
  const { loading, error, data } = useQuery(GET_IMAGE_COLLECTION, {
    variables: { id: imageCollectionId },
  });

  const [uploadImage] = useMutation(UPLOAD_IMAGE);

  const [showModal, setShowModal] = useState(false);
  const [image, setImage] = useState({});
  const [file, setFile] = useState(null);

  const onSave = () => {
    console.log('save');
    if (image.id) {
      if (file) {
        console.log('file', file);
      }
    } else {
      if (file) {
        uploadImage({
          variables: {
            file,
            alt: image.alt,
            id: imageCollectionId,
          },
          refetchQueries: [
            {
              query: GET_IMAGE_COLLECTION,
              variables: { id: imageCollectionId },
            },
          ],
        });
        onClose();
      }
    }
  };

  const onClose = () => {
    setImage({});
    setShowModal(false);
  };

  const onRemove = (image) => {
    console.log('remove', image);
  };

  const onEdit = (image) => {
    console.log('edit', image);
    setImage(image);
    setShowModal(true);
  };

  const onAdd = () => {
    console.log('add');
    setFile(null);
    setImage({});
    setShowModal(true);
  };

  const onImageChange = ({ field, value }) => {
    setImage({
      ...image,
      [field]: value,
    });
  };

  const onUploadChange = (file) => {
    setFile(file);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error :(</div>;

  const images = data?.imageCollection?.images;
  const tableData = images?.map((image) => {
    const thumbnail = (
      <img
        src={image.url || 'https://via.placeholder.com/150'}
        alt={image.alt}
        className={styles.image}
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = 'https://via.placeholder.com/150';
        }}
      />
    );
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

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <div>Images</div>
        <button className={`btn btn-primary ${styles.button}`} onClick={onAdd}>
          Add New Image
        </button>
      </div>
      <CustomTable data={tableData} columns={columns} headers={headers} />
      <CustomModal
        show={showModal}
        image={image}
        onSave={onSave}
        onClose={onClose}
        isDisabled={false}
      >
        {file ? (
          <img
            src={URL.createObjectURL(file)}
            alt={image.alt}
            className={styles.image}
          />
        ) : (
          <ImageUpload image={image} onChange={onUploadChange} />
        )}
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
