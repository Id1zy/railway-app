import React from 'react';
import { createPortal } from 'react-dom';
import ModalContent from './Modal';

export default function Portal({open, children, onClose}) {
    if (!open){
        return null
    }
    return (
      <>
        {createPortal(
          <ModalContent open={open} onClose={onClose}>
            {children}
          </ModalContent>,
          document.getElementById('portal')
        )}
      </>
    );
  }