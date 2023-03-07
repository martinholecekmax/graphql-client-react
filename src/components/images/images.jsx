import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import CustomModal from '../custom-modal/custom-modal';
import CustomTable from '../custom-table/custom-table';
import ImageUpload from '../image-upload/image-upload';
import TextField from '../text-field/text-field';

import * as styles from './images.module.css';

const Images = ({ onChange, field, images }) => {
  const [showModal, setShowModal] = useState(false);

  const [image, setImage] = useState({});

  const onSave = () => {
    console.log('save');
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
    setImage({});
    setShowModal(true);
  };

  const onImageChange = ({ field, value }) => {
    setImage({
      ...image,
      [field]: value,
    });
  };

  const data = images?.map((image) => {
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
      <CustomTable data={data} columns={columns} headers={headers} />
      <CustomModal
        show={showModal}
        image={image}
        onSave={onSave}
        onClose={onClose}
        isDisabled={false}
      >
        <ImageUpload image={image} />
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
