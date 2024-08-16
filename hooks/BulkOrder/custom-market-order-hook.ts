import React, { useState } from 'react';

const useCustomMarketOrder = (formData: any, setFormData: any) => {
  const [errMsgCustomOrder, setErrMsgCustomOrder] = useState('');
  // Function to add a new row to custom market order details table
  const addCustomMarketOrderRow = () => {
    setErrMsgCustomOrder('');
    setFormData({
      ...formData,
      customMarketOrderDetails: [
        ...formData?.customMarketOrderDetails,
        {
          item_code: '',
          qty: [{ qty: '', size: '' }],
          uom: '',
        },
      ],
    });
  };

  // Function to delete a row from bunchOrderDetails
  const deleteCustomMarketOrderRow = (index: number) => {
    setErrMsgCustomOrder('');
    setFormData((prevState: any) => ({
      ...prevState,
      customMarketOrderDetails: prevState?.customMarketOrderDetails.filter((_: any, i: number) => i !== index),
    }));
  };
  const handleChangeCustomOrder = (e: React.ChangeEvent<HTMLInputElement>, index: number, key: string, subIndex?: number) => {
    const { value } = e.target;

    setFormData((prevState: any) => ({
      ...prevState,
      customMarketOrderDetails: prevState.customMarketOrderDetails.map((detail: any, i: number) => {
        if (i === index) {
          if (key === 'qty' || key === 'size') {
            // Ensure qty and size are non-zero and positive
            if (parseFloat(value) > 0) {
              setErrMsgCustomOrder('');
              return {
                ...detail,
                qty: detail.qty.map((qtyItem: any, subIdx: number) =>
                  subIdx === subIndex ? { ...qtyItem, [key]: parseFloat(value) } : qtyItem
                ),
              };
            } else {
              setErrMsgCustomOrder('Quantity and size value must be a non-zero and positive number.');
              return detail;
            }
          } else {
            // For other fields like description
            return {
              ...detail,
              [key]: value,
            };
          }
        }
        return detail;
      }),
    }));
  };
  return { errMsgCustomOrder, addCustomMarketOrderRow, deleteCustomMarketOrderRow, handleChangeCustomOrder };
};

export default useCustomMarketOrder;
