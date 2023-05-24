import { useState } from 'react';

interface Response {
  userTelegramId: number;
  errorMessage: string;
}

export const useResponse = () => {
  const initialState: Response = { userTelegramId: 0, errorMessage: '' };
  const [response, setResponse] = useState<Response>(initialState);

  const resetResponse = () => {
    setResponse(initialState);
  };

  const handleResponse = (result: Response) => {
    setResponse(result);
  };

  return {
    response,
    resetResponse,
    handleResponse,
  };
};
