import { Drawer, DrawerProps } from "antd";
import { useFormik } from "formik";
import { useCallback } from "react";
import Button from "src/components/buttons/Button";
import Input from "src/components/inputs/Input";
import { object, string } from "yup";

enum FORM_FIELDS {
  NAME = "name",
}

const SubjectFilterOverlay = ({
  open,
  onClose,
  handleFilter,
  ...rest
}: DrawerProps & {
  handleFilter: (data: { [x: string]: string }) => void;
  onClose: () => void;
}) => {
  const { errors, handleChange, handleSubmit, resetForm, touched, values } =
    useFormik({
      enableReinitialize: true,
      initialValues: {
        [FORM_FIELDS.NAME]: "",
      },
      validationSchema: object({
        [FORM_FIELDS.NAME]: string().required("This is a required field."),
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
        <Input
          label="Subject Name"
          placeholder="Enter Subject Name"
          name={FORM_FIELDS.NAME}
          value={values[FORM_FIELDS.NAME] as string}
          error={getFieldError(FORM_FIELDS.NAME)}
          onChange={handleChange}
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

export default SubjectFilterOverlay;
