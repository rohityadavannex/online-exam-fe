import { useCallback, useEffect, useState } from "react";

const useFetchAsync = (
  asyncFn: (...args: any) => void,
  executeImmediately: boolean = false
) => {
  const [inProgress, setInProgress] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [data, setData] = useState<any>(undefined);
  const [error, setError] = useState<any>(undefined);
  const handleExecution = useCallback(
    async (...args: any) => {
      try {
        setInProgress(true);
        setIsSuccess(false);
        const res = await asyncFn(...args);
        setData(res);
        setIsSuccess(true);
      } catch (err) {
        setError(err);
      } finally {
        setInProgress(false);
        // setTimeout(() => {
        //   setIsSuccess(false);
        // }, 0);
      }
    },
    [asyncFn]
  );

  useEffect(() => {
    if (executeImmediately) {
      handleExecution();
    }
  }, [executeImmediately, handleExecution]);

  return {
    execute: handleExecution,
    isLoading: inProgress,
    data,
    error,
    isSuccess,
  };
};

export default useFetchAsync;
