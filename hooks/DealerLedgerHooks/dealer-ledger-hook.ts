import react, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDealerLedgerSummary } from "../../store/slices/dealer-ledger-slice/dealer-ledger-summary";
import { get_access_token } from "../../store/slices/auth/token-login-slice";

const UseDealerLedgerHook = () => {
  const dispatch = useDispatch();
  const TokenFromStore = useSelector(get_access_token);
  useEffect(() => {
    dispatch(fetchDealerLedgerSummary(TokenFromStore?.token));
  }, []);

  return;
};

export default UseDealerLedgerHook;
