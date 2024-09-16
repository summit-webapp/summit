import { useState } from 'react';

const useModalShow = () => {
  const [show, setShow] = useState(false);
  const [showCreateAddModal, setShowCreateAddModal] = useState(false);
  const [showBilling, setShowBilling] = useState(false);
  const [showCreateBillingAddModal, setShowCreateBillingAddModal] = useState(false);

  return {
    show,
    showCreateAddModal,
    showBilling,
    showCreateBillingAddModal,
    setShowCreateAddModal,
    setShowBilling,
    setShow,
    setShowCreateBillingAddModal,
  };
};

export default useModalShow;
