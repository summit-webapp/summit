import React, { useState } from "react";
// import createNewQuickOrderRecord, {
//   getRefCodesListAPI,
// } from "../../../services/api/quick-order-api";
import { useDispatch } from "react-redux";
// import { cartAPI } from "../../../store/screens/cart";

const useQuickOrder = () => {
  const [inputValue, setInputValue] = useState("");
  const [qtySizeInput, setQtySizeInput] = useState<any>("");
  const [quickOrderData, setQuickOrderData] = useState<any>([]);
  const [customerName, setCustomerName] = useState<any>("");
  const [refCodesList, setRefCodesList] = useState<any>([]);
  const [disableInputField, setDisabledInputField] = useState<boolean>(true);
  const [QuickOrderNotification, setQuickOrderNotification] =
    useState<boolean>(false);
  const [notificationMessage, setNotificationMessage] = useState<string>("");
  const dispatch = useDispatch();

  const purity: any = localStorage.getItem("localPurity");
  let user: any = localStorage.getItem("user");
//   let users = user ? JSON.parse(user) : null;
//   let param = {
//     user: users,
//   };
  const handleInputChange = (e: any, field: any) => {
    let inputValue: any = e.target.value;
    if (field === "qty_size") {
      setQtySizeInput(inputValue);
    } else if (field === "customer_name") {
      setCustomerName(inputValue);
    }
  };

  const handleCustomerName: any = async () => {
    // let refCodesList: any = await getRefCodesListAPI(customerName);
    // if (
    //   refCodesList?.status === 200 &&
    //   refCodesList?.data?.message?.length > 0
    // ) {
    //   setRefCodesList(refCodesList.data.message);
    //   setDisabledInputField(false);
    // } else {
    //   setRefCodesList([]);
    // }
  };

  const handleSaveBtn: any = () => {
    if (Object.keys(qtySizeInput)?.length > 0 || inputValue) {
      const ordersArray = qtySizeInput.split(",").map((order: any) => {
        const [size, qty] = order.split("/");
        return { size: parseInt(size), qty: parseInt(qty) };
      });

      const newRecord = { item_code: inputValue, qty_size_list: ordersArray };
      setQuickOrderData((prevData: any) => [...prevData, newRecord]);
      setInputValue("");
      setQtySizeInput("");
    }
  };

  const handleDltQuickOrderRecord: any = (id: any) => {
    const updatedRecord: any = quickOrderData.filter(
      (data: any, index: any) => index !== id
    );
    setQuickOrderData(updatedRecord);
  };

  const handleSubmitBtn: any = async () => {
    const values: any = {
      customer_name: customerName,
      purity: purity,
      user: JSON.parse(user),
      items: quickOrderData,
    };
    // let createQuickOrderRecord: any = await createNewQuickOrderRecord(values);
    // if (
    //   createQuickOrderRecord?.data?.hasOwnProperty("message") &&
    //   createQuickOrderRecord?.data?.message?.includes("Quotation")
    // ) {
    //   setQuickOrderData([]);
    //   setQuickOrderNotification(true);
    //   setNotificationMessage("Quotation Created Successfully");
    //   await dispatch(cartAPI(param));
    // } else {
    //   setQuickOrderNotification(true);
    //   setNotificationMessage(
    //     "Something went wrong while creating Quotation. Please try again."
    //   );
    // }
  };

  return {
    handleSaveBtn,
    quickOrderData,
    handleInputChange,
    inputValue,
    setInputValue,
    qtySizeInput,
    handleSubmitBtn,
    handleDltQuickOrderRecord,
    customerName,
    handleCustomerName,
    refCodesList,
    disableInputField,
    QuickOrderNotification,
    setQuickOrderNotification,
    notificationMessage,
  };
};

export default useQuickOrder;
