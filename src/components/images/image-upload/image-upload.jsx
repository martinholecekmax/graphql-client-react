import React from 'react';
import { faCloudUploadAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDropzone } from 'react-dropzone';

import * as styles from './image-upload.module.css';

const ImageUpload = ({ field, onChange, error }) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'image/*': ['.jpeg', '.png'],
    },
    onDrop: (acceptedFiles) => {
      onChange({
        field,
        value: acceptedFiles[0],
      });
    },
  });

  const activeStyle = isDragActive ? styles.active : '';
  const errorStyle = error ? styles.error : '';
  const contentStyle = `${styles.content} ${activeStyle} ${errorStyle}`;

  return (
    <div className={styles.container}>
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        <div className={contentStyle}>
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
