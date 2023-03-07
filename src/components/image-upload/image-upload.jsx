import { faCloudUploadAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useDropzone } from 'react-dropzone';

import * as styles from './image-upload.module.css';

const ImageUpload = ({ image, onChange }) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: 'image/*',
    onDrop: (acceptedFiles) => {
      console.log(acceptedFiles);
    },
  });

  return (
    <div className={styles.dragArea}>
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        <div
          className={`${isDragActive ? styles.active : ''} ${
            styles.dragAreaInner
          }`}
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
