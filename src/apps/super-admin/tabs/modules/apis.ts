import { useCallback } from "react";
import useFetchAsync from "src/hooks/useFetchAsync";
import { get, post } from "src/http-clients/clients";
import useSWR from "swr";

export const useCreateModule = () => {
  const create = useCallback((data: { label: string; value: string }) => {
    return post("/super-admin/modules/create", data);
  }, []);

  return useFetchAsync(create);
};

export const useGetModule = () => {
  return useSWR<{ data: { label: string; value: string }[] }>(
    "/super-admin/modules/list",
    get
  );
};
