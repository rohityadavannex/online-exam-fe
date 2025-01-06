import { Drawer, DrawerProps } from "antd";
import dayjs from "dayjs";
import { useFormik } from "formik";
import { useCallback } from "react";
import Button from "src/components/buttons/Button";
import DatePicker from "src/components/calendar/DatePicker";
import { object, string } from "yup";

enum FORM_FIELDS {
  SESSION_START = "sessionStart",
}

const AcademicYearFilterOverlay = ({
  open,
  onClose,
  handleFilter,
  ...rest
}: DrawerProps & {
  handleFilter: (data: { [x: string]: string }) => void;
  onClose: () => void;
}) => {
  const { errors, setFieldValue, handleSubmit, resetForm, touched, values } =
    useFormik({
      enableReinitialize: true,
      initialValues: {
        [FORM_FIELDS.SESSION_START]: "",
      },
      validationSchema: object({
        [FORM_FIELDS.SESSION_START]: string().required(
          "This is a required field."
        ),
      }),
      onSubmit: (data) => {
        handleFilter(data);
        onClose();
      },
    });

  const getFieldError = useCallback(
    (fieldName: FORM_FIELDS) => {
      return touched[fieldName] ? (errors[fieldName] as string) : undefined;
    },
    [errors, touched]
  );

  return (
    <Drawer
      title="Filter"
      placement={"right"}
      closable={true}
      onClose={() => [resetForm(), onClose?.()]}
      open={open}
      key={"right"}
      {...rest}
    >
      <form onSubmit={handleSubmit} className="flex flex-col">
        <DatePicker
          label="Session Start"
          className="h-[46px]"
          placeholder="Enter Session Start"
          picker="month"
          name={FORM_FIELDS.SESSION_START}
          error={getFieldError(FORM_FIELDS.SESSION_START)}
          value={
            values[FORM_FIELDS.SESSION_START]
              ? dayjs(values[FORM_FIELDS.SESSION_START])
              : undefined
          }
          onChange={(_, dateString) =>
            setFieldValue(FORM_FIELDS.SESSION_START, `${dateString}`)
          }
          disabled={false}
          required
        />
        <div className="flex items-center mt-6 gap-3">
          <Button
            onClick={() => resetForm()}
            className="min-w-24 h-12 rounded-lg"
            danger
          >
            Reset
          </Button>
          <Button
            type="primary"
            className="min-w-24 h-12 rounded-lg"
            htmlType="submit"
          >
            Save
          </Button>
        </div>
      </form>
    </Drawer>
  );
};

export default AcademicYearFilterOverlay;
