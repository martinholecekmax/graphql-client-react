import React from 'react';
import { Modal } from 'react-bootstrap';

import * as styles from './custom-modal.module.css';

const CustomModal = ({ onSave, onClose, show, isDisabled, children }) => {
  return (
    <Modal
      show={show}
      onHide={onClose}
      className={styles.modal}
      dialogClassName={styles.dialog}
    >
      <Modal.Header>
        <div className={styles.title}>
          <div>Image</div>
          <div onClick={onClose} className={styles.close}>
            &times;
          </div>
        </div>
      </Modal.Header>
      <Modal.Body className={styles.modalBody}>
        {children}
        <div className={styles.buttons}>
          <button
            className={`btn btn-outline-secondary ${styles.cancelButton}`}
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className={`btn btn-success ${styles.confirmButton}`}
            onClick={onSave}
            disabled={isDisabled}
          >
            Save
          </button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default CustomModal;
