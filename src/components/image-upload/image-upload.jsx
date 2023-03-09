import React from 'react';
import { faCloudUploadAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDropzone } from 'react-dropzone';

import * as styles from './image-upload.module.css';

const ImageUpload = ({ onDrop }) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'image/*': ['.jpeg', '.png'],
    },
    onDrop: (acceptedFiles) => {
      onDrop(acceptedFiles[0]);
    },
  });

  return (
    <div className={styles.container}>
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        <div
          className={`${isDragActive ? styles.active : ''} ${styles.content}`}
        >
          <div className={styles.icon}>
            <FontAwesomeIcon icon={faCloudUploadAlt} />
          </div>
          <div>Select File to Upload</div>
          <small>or Drag &amp; Drop</small>
        </div>
      </div>
    </div>
  );
};

export default ImageUpload;
