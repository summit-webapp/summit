import React, { useState } from 'react';
import { CONSTANTS } from '../../services/config/app-config';

const useBunchOrder = (formData: any, setFormData: any) => {
  const [errMsgBuchOrder, setErrMsgBunchOrder] = useState('');
  const [isBunchWeightDisabled, setIsBunchWeightDisabled] = useState<boolean>(false);
  const [perInchWeight, setPerInchWeight] = useState<any[]>([]);
  const [perInchLengthSize, setPerInchLengthSize] = useState<any[]>([]);
  // Function to add a new row to bunch order details table
  const addBunchOrderRow = () => {
    setErrMsgBunchOrder('');
    setFormData({
      ...formData,
      bunchOrderDetails: [
        ...formData?.bunchOrderDetails,
        {
          item_code: '',
          qty: [{ qty: '', size: '' }], // Initialize qty as an array of objects
          uom: '',
          bunch_weight: '',
          weight_per_unit: '',
          estimate_bunch_weight: '',
          is_bunch: '',
        },
      ],
    });
  };

  // Function to delete a row from bunchOrderDetails
  const deleteBunchOrderRow = (index: number) => {
    setErrMsgBunchOrder('');
    setFormData((prevState: any) => ({
      ...prevState,
      bunchOrderDetails: prevState?.bunchOrderDetails.filter((_: any, i: number) => i !== index),
    }));
  };
  // const fetchItemDetails = async (itemCode: string, index: number) => {
  //   try {
  //     const response = await fetch(
  //       `${CONSTANTS.API_BASE_URL}/api/resource/Item/${itemCode}`
  //     );
  //     if (!response.ok) {
  //       throw new Error("Failed to fetch Item data");
  //     }
  //     const data = await response.json();

  //     const weightPerUnit = data?.data?.weight_per_unit;
  //     const length = data?.data?.length;

  //     if (weightPerUnit !== undefined && length !== undefined) {
  //       setItemDetails((prevDetails:any) => {
  //         const newDetails = [...prevDetails, weightPerUnit];
  //         // newDetails[index] = weightPerUnit;
  //         return newDetails;
  //       });

  //       setItemSize((prevSizes:any) => {
  //         const newSizes = [...prevSizes, length];
  //         // newSizes[index] = length;
  //         return newSizes;
  //       });

  //       const perInchWeightValue =
  //         length !== 0 ? length / weightPerUnit : "0.000";
  //       setPerInchWeight((prevWeights) => {
  //         const newWeights = [...prevWeights, perInchWeightValue];
  //         // newWeights[index] = perInchWeightValue;
  //         return newWeights;
  //       });

  //       const perInchLengthSize =
  //         length !== 0 ? weightPerUnit / length : "0.000";
  //       setPerInchLengthSize((prevWeights) => {
  //         const newWeights = [...prevWeights, perInchLengthSize];
  //         // newWeights[index] = perInchWeightValue;
  //         return newWeights;
  //       });
  //     } else {
  //       setItemDetails((prevDetails) => {
  //         const newDetails = [...prevDetails, null];
  //         // newDetails[index] = null;
  //         return newDetails;
  //       });
  //       setItemSize((prevSizes) => {
  //         const newSizes = [...prevSizes, null];
  //         // newSizes[index] = null;
  //         return newSizes;
  //       });
  //       setPerInchWeight((prevWeights) => {
  //         const newWeights = [...prevWeights, "0.00"];
  //         // newWeights[index] = "0.000";
  //         return newWeights;
  //       });
  //     }
  //   } catch (error) {
  //   }
  // };

  const handleChangeBunchOrder = (e: React.ChangeEvent<HTMLInputElement>, index: number, key: string, subIndex?: number) => {
    const { value } = e.target;
    // Handle both positive values and empty strings for clearing input
    if (parseFloat(value) > 0 || value === '') {
      setErrMsgBunchOrder('');

      if (key === 'bunch_weight') {
        setIsBunchWeightDisabled(false);
        const total_weight = parseFloat(value);

        setFormData((prevState: any) => ({
          ...prevState,
          bunchOrderDetails: prevState.bunchOrderDetails.map((detail: any, i: number) =>
            i === index
              ? {
                  ...detail,
                  [key]: value,
                  estimate_bunch_weight: total_weight,
                  is_bunch: 1, // Ensure is_bunch is set to 1
                  item_code: detail.item_code,
                  weight_per_unit: perInchWeight[index],
                  qty: detail.qty.map((qtyItem: any, subIdx: number) =>
                    subIdx === subIndex
                      ? {
                          ...qtyItem,
                          size: !isNaN(total_weight * perInchWeight[index]) ? (total_weight * perInchWeight[index]).toFixed(3) : '',
                          // size: 1,
                          qty: 1,
                        }
                      : {
                          // size: 1,
                          size: !isNaN(total_weight * perInchWeight[index]) ? (total_weight * perInchWeight[index]).toFixed(2) : '',
                          qty: 1,
                        }
                  ),
                }
              : detail
          ),
        }));
      } else if (key === 'qty') {
        // When updating qty, set qty to 1 and ensure to maintain the size as well
        setFormData((prevState: any) => ({
          ...prevState,
          bunchOrderDetails: prevState.bunchOrderDetails.map((detail: any, i: number) =>
            i === index
              ? {
                  ...detail,
                  is_bunch: 1, // Ensure is_bunch is set to 1
                  qty: detail.qty.map((qtyItem: any, subIdx: number) =>
                    subIdx === subIndex
                      ? {
                          ...qtyItem,
                          qty: 1, // Ensure qty is always 1
                          size: 1,
                        }
                      : qtyItem
                  ),
                  item_code: detail.item_code,
                  bunch_weight: detail.bunch_weight,
                  estimate_bunch_weight: detail.total_weight,
                }
              : detail
          ),
        }));
      }
      if (key === 'size') {
        setIsBunchWeightDisabled(true);
        // When updating size, ensure to maintain the qty as well
        setFormData((prevState: any) => ({
          ...prevState,
          bunchOrderDetails: prevState.bunchOrderDetails.map((detail: any, i: number) =>
            i === index
              ? {
                  ...detail,
                  is_bunch: 1, // Ensure is_bunch is set to 1
                  qty: detail.qty.map((qtyItem: any, subIdx: number) =>
                    subIdx === subIndex
                      ? {
                          ...qtyItem,
                          size: !isNaN(parseFloat(value)) ? parseFloat(value) : '',
                          qty: 1, // Ensure qty remains 1
                        }
                      : qtyItem
                  ),
                  weight_per_unit: perInchLengthSize[0],
                  item_code: detail.item_code,
                  bunch_weight: detail.bunch_weight,
                  estimate_bunch_weight: (parseFloat(value) * perInchLengthSize[0]).toFixed(2),
                }
              : detail
          ),
        }));
      } else {
        // Update formData normally for other fields
        setFormData((prevState: any) => ({
          ...prevState,
          bunchOrderDetails: prevState.bunchOrderDetails.map((detail: any, i: number) =>
            i === index ? { ...detail, [key]: value, is_bunch: 1 } : detail
          ),
        }));
      }
    } else if (parseFloat(value) <= 0) {
      setErrMsgBunchOrder('Quantity and size value must be a non-zero and positive number.');
    } else {
      // Update formData normally for other fields
      setFormData((prevState: any) => ({
        ...prevState,
        bunchOrderDetails: prevState.bunchOrderDetails.map((detail: any, i: number) =>
          i === index ? { ...detail, [key]: value, is_bunch: 1 } : detail
        ),
      }));
    }
  };

  return {
    errMsgBuchOrder,
    addBunchOrderRow,
    deleteBunchOrderRow,
    handleChangeBunchOrder,
    isBunchWeightDisabled,
  };
};

export default useBunchOrder;
