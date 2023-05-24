import { useState } from 'react';

export const useResponse = () => {
  const initialState = { userTelegramId: 0, errorMessage: '' };
  const [response, setResponse] = useState(initialState);

  const resetResponse = () => {
    setResponse(initialState);
  };

  const handleResponse = result => {
    setResponse(result);
  };

  return {
    response,
    resetResponse,
    handleResponse,
  };
};
