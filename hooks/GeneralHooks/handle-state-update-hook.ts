import { useState } from 'react';

const useHandleStateUpdate = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrMessage] = useState<string>('');
  return { isLoading, setIsLoading, errorMessage, setErrMessage };
};

export default useHandleStateUpdate;
