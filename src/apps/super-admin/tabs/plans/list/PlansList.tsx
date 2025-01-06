import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TAB_NAMES } from "src/apps/common/menu-navigation/menuNavigation";
import TabHeader from "src/apps/common/tab-header/TabHeader";
import ConfirmationModal from "src/components/modals/ConfirmationModal";
import ReactTable from "src/components/tables/react-table/ReactTable";
import { getFormattedDate } from "src/helpers/helpers";
import useDebounce from "src/hooks/useDebounce";
import useNotification from "src/hooks/useNotification";
import useSetActiveTab from "src/hooks/useSetActiveTab";
import { PLANS_FEATURES } from "src/utils/constants";
import {
  useDeletePlan,
  useGetPlans,
  useUpdatePlanStatus,
} from "../api-clients";
import { PlanType } from "./plan-types";
import usePlansTableColumns from "./usePlansTableColumns";

const PlansList = () => {
  useSetActiveTab(TAB_NAMES.PLANS);
  const navigate = useNavigate();
  const [length, setLength] = useState(10);
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const debouncedSearch = useDebounce(searchText);
  const { successNotification, errorNotification } = useNotification();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [idToOperate, setIdToOperate] = useState<number | undefined>(undefined);
  const { execute: handlePlanStatusChange, isSuccess: isStatusUpdateSuccess } =
    useUpdatePlanStatus();
  const {
    isLoading,
    error,
    data,
    mutate: updatePlanData,
    isValidating,
  } = useGetPlans({ length, page, search: debouncedSearch });

  const {
    isLoading: isDeleteLoading,
    isSuccess: isDeleteSucceed,
    error: deleteErr,
    execute: deletePlan,
  } = useDeletePlan();

  const plansData = useMemo(() => data?.data?.rows ?? [], [data?.data]);

  const mappedPlansData = useMemo(() => {
    return plansData.map((plan: PlanType) => {
      return {
        ...plan,
        features: plan.features.map(
          (value) => PLANS_FEATURES.find((item) => item.value === value)!.label
        ),
        createdAt: getFormattedDate(plan.createdAt),
        updatedAt: getFormattedDate(plan.updatedAt),
      };
    });
  }, [plansData]);

  const totalRecords = useMemo(() => data?.data?.count, [data?.data?.count]);

  const columns = usePlansTableColumns({
    onDelete: (id: number) => {
      setIdToOperate(id);
      setIsDeleteModalOpen(true);
    },
    handlePlanStatusChange,
  });

  useEffect(() => {
    if (isDeleteSucceed) {
      updatePlanData();
      setIsDeleteModalOpen(false);
      successNotification("Plan Deleted.");
    }
  }, [isDeleteSucceed, successNotification, updatePlanData]);

  useEffect(() => {
    if (deleteErr) {
      errorNotification();
    }
  }, [deleteErr, errorNotification]);

  useEffect(() => {
    if (isStatusUpdateSuccess) {
      updatePlanData();
    }
  }, [isStatusUpdateSuccess, updatePlanData]);

  return (
    <>
      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        isLoading={isDeleteLoading}
        onSubmit={() => deletePlan(idToOperate)}
      />
      <div className="flex flex-col gap-[20px]">
        <TabHeader
          label="Plans Management"
          onRefresh={() => updatePlanData()}
          printButton={{
            label: "Print",
            onClick: () => window.print(),
          }}
          createButton={{
            label: "Create New Plans",
            onClick: () => navigate("create"),
          }}
          search={{
            onChange: (val) => setSearchText(val),
            value: searchText,
          }}
        />
        <ReactTable
          columns={columns}
          data={mappedPlansData}
          isLoading={isLoading}
          pagination={{
            setLength,
            length,
            total: totalRecords,
            page,
            setPage,
          }}
        />
      </div>
    </>
  );
};

export default PlansList;
