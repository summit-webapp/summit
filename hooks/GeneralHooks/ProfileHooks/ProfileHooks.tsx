import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { fetchprofileDataThunk, profileData_state } from "../../../store/slices/general_slices/profile-page-slice";
import { get_access_token } from "../../../store/slices/auth/token-login-slice";

const useProfilePage = () => {
  let [profileList, setProfileList] = useState<any>([]);
  let [ageingReport, setAgeingReport] = useState<any>([]);
  let [enquiryHistoryPro, setEnquiryHistoryPro] = useState<any>([]);
  let [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const profileData: any = useSelector(profileData_state);
  console.log("###quot in api hook", profileData?.items?.enquiryData);
  const TokenFromStore: any = useSelector(get_access_token)

  useEffect(() => {
    console.log("profile page initial load");
    dispatch(fetchprofileDataThunk(TokenFromStore?.token));
    setLoading(true)

  }, []);
  console.log("###quot in api hook12", profileList);
  useEffect(() => {
    setProfileList(profileData?.items?.data?.message?.data);
    if (profileData?.items?.enquiryData?.length > 0) {
      setEnquiryHistoryPro(profileData?.items?.enquiryData);
    }
  }, [profileData]);

  console.log("ageing report", profileList);
  console.log("###quot in api in state", enquiryHistoryPro);

  return {
    profileList,
    ageingReport,
    loading,
    setLoading,
    enquiryHistoryPro,
  };
};

export default useProfilePage;
