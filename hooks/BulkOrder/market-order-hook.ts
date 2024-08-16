import React, { useState } from 'react';

const useMarketOrder = ( formData:any, setFormData:any ) => {
  const [errMsgMarketOrder, setErrMsgMarketOrder] = useState<any>('');
  
  // Function to add a new row to market order details table
  const addMarketOrderRow = () => {
    setErrMsgMarketOrder('');
    // Initialize qty as an array with 23 elements (to cover 22 sizes + 1 for 1 inch qty)
    const initialQty = Array.from({ length: 24 }, () => ({
      qty: '',
      size: '',
    }));

    setFormData({
      ...formData,
      marketOrderDetails: [
        ...formData?.marketOrderDetails,
        {
          item_code: '',
          qty: initialQty, // Initialize qty as an array of objects
          uom: '',
        },
      ],
    });
  };

  // Function to delete a new row to market order details table
  const deleteMarketOrderRow = (index: number) => {
    setErrMsgMarketOrder('');
    setFormData((prevState: any) => ({
      ...prevState,
      marketOrderDetails: prevState?.marketOrderDetails.filter((_: any, i: number) => i !== index),
    }));
  };
  const handleChangeMarketOrder = (e: React.ChangeEvent<HTMLInputElement>, index: number, key: string, subKey?: number) => {
    const { value } = e.target;
    const updatedMarketOrderDetails = [...formData.marketOrderDetails];

    if (key === 'qty') {
      // Allow empty value to enable removal of the number
      if (value === '') {
        setErrMsgMarketOrder('');
        if (subKey !== undefined && updatedMarketOrderDetails[index].qty[subKey]) {
          updatedMarketOrderDetails[index].qty[subKey].qty = value;
          updatedMarketOrderDetails[index].qty[subKey].size = 14 + subKey; // Update size based on the subKey
        }
        if (subKey === 22) {
          updatedMarketOrderDetails[index].qty[22].qty = value;
          updatedMarketOrderDetails[index].qty[22].size = 1; // Update size for 1 inch
        }
      }
      // Ensure qty is a non-zero and positive number
      else if (parseFloat(value) > 0) {
        setErrMsgMarketOrder('');
        if (subKey !== undefined && updatedMarketOrderDetails[index].qty[subKey]) {
          // Update specific size (subKey)
          updatedMarketOrderDetails[index].qty[subKey].qty = value;
          updatedMarketOrderDetails[index].qty[subKey].size = 14 + subKey; // Update size based on the subKey
        }
        if (subKey === 22) {
          // Update 1 Inch Qty
          updatedMarketOrderDetails[index].qty[22].qty = value;
          updatedMarketOrderDetails[index].qty[22].size = 1; // Update size for 1 inch
        }
      } else {
        setErrMsgMarketOrder('Quantity value must be a non-zero and positive number.');
        return;
      }
    } else {
      // Update other keys
      updatedMarketOrderDetails[index][key] = value;
    }

    setFormData({
      ...formData,
      marketOrderDetails: updatedMarketOrderDetails,
    });
  };
  return { errMsgMarketOrder, addMarketOrderRow, deleteMarketOrderRow, handleChangeMarketOrder };
};

export default useMarketOrder;
