import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { CONSTANTS } from '../../services/config/app-config';
import { get_access_token } from '../../store/slices/auth/token-login-slice';
import useHandleStateUpdate from '../GeneralHooks/handle-state-update-hook';
import { AddMechanicToUserAPI } from '../../services/api/user/add-mechanic-to-user-api';

const useAddMechanic = () => {
  const { SUMMIT_APP_CONFIG }: any = CONSTANTS;
  const tokenFromStore: any = useSelector(get_access_token);
  const { isLoading, setIsLoading, errorMessage, setErrMessage }: any = useHandleStateUpdate();


  const handleAddMechanic = async ({ email_id, mechanic }: any) => {

    const param = {
      version: "v2",
      method: "update_mechanic_in_customer",
      entity: "user",
      email_id,
      mechanic
    };

    setIsLoading(true);
    try {
      let addMechanic: any = await AddMechanicToUserAPI(SUMMIT_APP_CONFIG, param, tokenFromStore.token);
      if (addMechanic?.status === 200 && addMechanic?.data?.message !== 'error') {
        toast.success("Mechanic updated successfully!");
      } else {
        toast.error(addMechanic?.data?.message?.error || 'Something went wrong');
        setErrMessage(addMechanic?.data?.message?.error);
      }

    } catch (error) {
      toast.error("Failed to update mechanic.");
      console.error("API Error:", error);
    } finally {
      setIsLoading(false);
    }
  }


  return {
    handleAddMechanic,
    isLoading
  };
};

export default useAddMechanic;
