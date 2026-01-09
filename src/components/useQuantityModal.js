import { useState } from 'react';
import QuantityModal from './QuantityModal';

const useQuantityModal = () => {
  const [isOpen, setOpen] = useState(false);
  const [onConfirm, setOnConfirm] = useState(() => () => {});

  const openModal = (confirmCallback) => {
    setOnConfirm(() => confirmCallback);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  return {
    isOpen,
    openModal,
    onConfirm,
    handleClose,
  };
};

export default useQuantityModal;
