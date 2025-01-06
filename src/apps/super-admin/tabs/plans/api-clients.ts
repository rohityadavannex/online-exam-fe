import { useCallback } from "react";
import { getQueryData } from "src/helpers/helpers";
import useFetchAsync from "src/hooks/useFetchAsync";
import {
  deleteReq,
  patch,
  useGet,
  usePatch,
  usePost,
} from "src/http-clients/clients";

export const useCreatePlan = () => {
  return usePost("/super-admin/plans/create-plan");
};

export const useGetPlans = ({
  length,
  page,
  search,
}: {
  length: number;
  page: number;
  search?: string;
}) => {
  const offset = page === 1 ? 0 : (page - 1) * length;
  const queryData = getQueryData({ length, offset, search });
  const data = useGet(`/super-admin/plans/plans-list${queryData}`);
  return data;
};

export const useGetPlanData = (planId: number) => {
  return useGet(planId ? `/super-admin/plans/plan/${planId}` : null);
};

export const useUpdatePlan = (userId: number) => {
  return usePatch(`/super-admin/plans/plan/${userId}`);
};

export const useUpdatePlanStatus = () => {
  const handleStatusChange = useCallback((planId: number, status: boolean) => {
    return patch(`/super-admin/plans/plan/status/${planId}`, { status });
  }, []);
  return useFetchAsync(handleStatusChange);
};

export const useDeletePlan = () => {
  const deleteData = useCallback((planId: number) => {
    return deleteReq(`/super-admin/plans/plan/${planId}`);
  }, []);
  return useFetchAsync(deleteData);
};
