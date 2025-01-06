import { useMemo } from "react";
import { useGetInventory } from "src/apps/user/tabs/inventory-management/list/api-inventory";

const useProductList = () => {
  const { isLoading, data, error, mutate, isValidating } = useGetInventory({
    length: 10,
    page: 1,
  });

  const productsData = useMemo(
    () =>
      data?.data?.rows?.map(
        (product: { productId: number; name: string; quantity: number }) => ({
          ...product,
          value: product.productId,
          label: product.name,
        })
      ) ?? [],
    [data?.data?.rows]
  );
  return {
    isLoading,
    data: productsData,
    error,
    mutate,
    isValidating,
  };
};

export default useProductList;
