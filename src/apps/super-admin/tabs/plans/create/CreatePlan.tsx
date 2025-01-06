import { useFormik } from "formik";
import { useCallback, useEffect, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { TAB_NAMES } from "src/apps/common/menu-navigation/menuNavigation";
import TabHeader from "src/apps/common/tab-header/TabHeader";
import ButtonV1 from "src/components/buttons/ButtonV1";
import Input from "src/components/inputs/Input";
import ToggleWithLabel from "src/components/toggles/Toggle";
import useNotification from "src/hooks/useNotification";
import useSetActiveTab from "src/hooks/useSetActiveTab";
import { number, object, string } from "yup";
import { useCreatePlan, useGetPlanData, useUpdatePlan } from "../api-clients";
import FeaturesCard from "./FeaturesCard";

const FORM_FIELDS = {
  NAME: "name",
  PRICE: "price",
  DURATION: "duration",
  FEATURES: "features",
  STATUS: "active",
};

const CreatePlan = ({ isInViewMode = false }: { isInViewMode?: boolean }) => {
  useSetActiveTab(TAB_NAMES.PLANS);
  const navigate = useNavigate();
  const { planId: id } = useParams();

  const planId = useMemo(() => Number(id), [id]);

  const isInEditMode = useMemo(() => !!planId, [planId]);

  const { errorNotification, successNotification } = useNotification();

  const { isLoading: isGetPlanLoading, data } = useGetPlanData(planId);

  const planData = useMemo(() => data?.data ?? {}, [data?.data]);

  const {
    isLoading: isUpdateLoading,
    execute: updatePlan,
    isSuccess: isUpdateSuccess,
    error: isUpdateError,
  } = useUpdatePlan(planId);

  const { isLoading, isSuccess, execute, error } = useCreatePlan();

  const { values, errors, handleSubmit, setFieldValue, touched } = useFormik({
    enableReinitialize: true,
    initialValues: {
      [FORM_FIELDS.NAME]: planData?.[FORM_FIELDS.NAME] ?? "",
      [FORM_FIELDS.PRICE]: planData?.[FORM_FIELDS.PRICE] ?? null,
      [FORM_FIELDS.DURATION]: planData?.[FORM_FIELDS.DURATION] ?? null,

      [FORM_FIELDS.STATUS]: planData?.[FORM_FIELDS.STATUS] ?? false,
      [FORM_FIELDS.FEATURES]: planData?.[FORM_FIELDS.FEATURES] ?? [],
    },
    validationSchema: object({
      [FORM_FIELDS.NAME]: string().required("This is a Required field."),
      [FORM_FIELDS.PRICE]: number()
        .nullable()
        .required("This is a Required field."),
      [FORM_FIELDS.DURATION]: number()
        .nullable()
        .required("This is a Required field."),
    }),
    onSubmit: (data) => {
      if (isInEditMode) {
        updatePlan(data);
        return;
      }
      execute(data);
    },
  });

  useEffect(() => {
    if (isSuccess || isUpdateSuccess) {
      successNotification(isUpdateSuccess ? "Plan Updated" : "Plan Created.");
      navigate("/plans");
    }
  }, [isSuccess, isUpdateSuccess, navigate, successNotification]);

  useEffect(() => {
    if (error || isUpdateError) {
      errorNotification();
    }
  }, [error, errorNotification, isUpdateError]);

  const isInLoading = useMemo(
    () => isLoading || isGetPlanLoading || isUpdateLoading,
    [isGetPlanLoading, isLoading, isUpdateLoading]
  );

  const isFieldDisabled = useMemo(
    () => isInViewMode || isInLoading,
    [isInLoading, isInViewMode]
  );

  const getFieldError = useCallback(
    (fieldName: string) => {
      return touched[fieldName] ? (errors[fieldName] as string) : undefined;
    },
    [errors, touched]
  );

  return (
    <div className="flex flex-col gap-[20px] h-full">
      <TabHeader label="Add New Plan" />
      <div className="flex flex-col justify-between gap-6 bg-white rounded-md py-[30px] px-[42px] h-fit">
        <div className="grid grid-cols-2 gap-[30px]">
          <Input
            label="Plan Name"
            placeholder="Plan Name"
            name={FORM_FIELDS.NAME}
            value={values[FORM_FIELDS.NAME] as string}
            error={getFieldError(FORM_FIELDS.NAME)}
            onChange={(e) => setFieldValue(FORM_FIELDS.NAME, e.target.value)}
            required
            disabled={isFieldDisabled}
          />

          <Input
            type="number"
            label="Price (₹)"
            placeholder="Price"
            name={FORM_FIELDS.PRICE}
            value={values[FORM_FIELDS.PRICE] as string}
            error={getFieldError(FORM_FIELDS.PRICE)}
            onChange={(e) => setFieldValue(FORM_FIELDS.PRICE, e.target.value)}
            disabled={isFieldDisabled}
            required
          />

          <Input
            type="number"
            label="Duration"
            placeholder="Duration"
            name={FORM_FIELDS.DURATION}
            value={values[FORM_FIELDS.DURATION] as string}
            error={getFieldError(FORM_FIELDS.DURATION)}
            onChange={(e) =>
              setFieldValue(FORM_FIELDS.DURATION, e.target.value)
            }
            disabled={isFieldDisabled}
            required
          />

          <FeaturesCard
            selectedFeatures={values[FORM_FIELDS.FEATURES]}
            setSelectedFeatures={(features) =>
              setFieldValue(FORM_FIELDS.FEATURES, features)
            }
          />

          <ToggleWithLabel
            label="Status"
            checked={values[FORM_FIELDS.STATUS] as boolean}
            onToggle={(val) => [setFieldValue(FORM_FIELDS.STATUS, val)]}
            disabled={isFieldDisabled}
            showToggleStatus
          />
        </div>
        <ButtonV1
          text={isLoading ? "Loading..." : "Submit"}
          onClick={handleSubmit}
          primary
          className="h-[40px] px-10"
          isDisabled={isFieldDisabled}
        />
      </div>
    </div>
  );
};

export default CreatePlan;
