import react, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  dealer_ledger_summary,
  fetchDealerLedgerSummary,
} from "../../store/slices/dealer-ledger-slice/dealer-ledger-summary";
import { get_access_token } from "../../store/slices/auth/token-login-slice";

const UseDealerLedgerHook = () => {
  const dispatch = useDispatch();
  const TokenFromStore: any = useSelector(get_access_token);
  const dealerLedgerSummaryFromStore: any = useSelector(dealer_ledger_summary);
  const [dealerLedgerSummary, setDealerLedgerSummary] = useState<any>();
  console.log("dealerLedgerSummaryFromStore", dealerLedgerSummaryFromStore);

  useEffect(() => {
    dispatch(fetchDealerLedgerSummary(TokenFromStore?.token));
  }, []);

  useEffect(() => {
    if (Object.keys(dealerLedgerSummaryFromStore?.data)?.length > 0) {
      setDealerLedgerSummary({ ...dealerLedgerSummaryFromStore?.data });
    }
  }, [dealerLedgerSummaryFromStore]);

  return { dealerLedgerSummary };
};

export default UseDealerLedgerHook;