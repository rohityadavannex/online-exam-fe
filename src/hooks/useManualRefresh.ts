import { useState } from "react";

const useManualRefresh = (mutate: () => void) => {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await mutate(); // Trigger revalidation
    setIsRefreshing(false);
  };

  return { isRefreshing, handleRefresh };
};

export default useManualRefresh;
