import React from 'react';
import { Modal } from 'react-bootstrap';
import Button from '../button/button';

import * as styles from './custom-modal.module.css';

const CustomModal = ({ onSave, onClose, show, isDisabled, children }) => {
  return (
    <Modal
      show={show}
      onHide={onClose}
      className={styles.modal}
      dialogClassName={styles.dialog}
      contentClassName={styles.content}
    >
      <Modal.Header className={styles.modalHeader}>
        <h3 className={styles.title}>
          <span>Image</span>
          <span onClick={onClose} className={styles.close}>
            &times;
          </span>
        </h3>
      </Modal.Header>
      <Modal.Body className={styles.modalBody}>
        {children}
        <div className={styles.buttons}>
          <Button variant='tertiary' onClick={onClose}>
            Cancel
          </Button>
          <Button variant='primary' onClick={onSave} disabled={isDisabled}>
            Save
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default CustomModal;
