import { Button, Input, Table } from "antd";
import { Field, Form, Formik } from "formik";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import useNotification from "src/hooks/useNotification";
import { useAddMarksForAnswerSheet } from "./api-client";

const EditableTable = ({ questionsData }: any) => {
  const { sheetId } = useParams();
  const { successNotification, errorNotification } = useNotification();
  const { isLoading, execute, isSuccess, error } = useAddMarksForAnswerSheet({
    sheetId: Number(sheetId),
  });

  const hasMarks = questionsData.some(
    (question: any) => question.obtainedMarks > 0
  );

  //   const initialValues = {
  //     tableData: [
  //       { id: 1, marks: 90, obtainedMarks: 85 },
  //       { id: 2, marks: 80, obtainedMarks: 75 },
  //       { id: 3, marks: 70, obtainedMarks: 65 },
  //     ],
  //   };

  const initialValues = {
    tableData: (questionsData ?? [])?.map((question: any, index: number) => {
      return {
        id: index + 1,
        questionId: question.questionId,
        marks: question.marks,
        obtainedMarks: question.obtainedMarks ?? 0,
      };
    }),
  };

  const handleSubmit = (values: any) => {
    console.log("Updated values:", values);
    const mappedData = values.tableData.map((item: any) => {
      const { id, ...rest } = item;
      return { ...rest, obtainedMarks: Number(item.obtainedMarks) };
    });

    execute({ data: mappedData });
  };

  useEffect(() => {
    if (isSuccess) {
      successNotification();
    }

    if (error) {
      errorNotification();
    }
  }, [error, errorNotification, isSuccess, successNotification]);

  const columns = [
    {
      title: "Question No.",
      dataIndex: "id",
      render: (text: any) => (
        <span className="flex w-full justify-center">{text}</span>
      ),
    },
    {
      title: "Marks",
      dataIndex: "marks",
      render: (text: any) => (
        <span className="flex w-full justify-center">{text}</span>
      ),
    },
    {
      title: "Obtained Marks",
      dataIndex: "obtainedMarks",
      render: (text: any, record: any, index: number) =>
        hasMarks ? (
          <span className="flex w-full justify-center">{text}</span>
        ) : (
          <Field name={`tableData.${index}.obtainedMarks`}>
            {({ field }: any) => <Input {...field} />}
          </Field>
        ),
    },
  ];

  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      onSubmit={handleSubmit}
    >
      {() => (
        <Form className="flex flex-col items-end w-full col-span-2">
          <Table
            rowKey="id"
            dataSource={initialValues.tableData}
            columns={columns}
            pagination={false}
            className="w-full"
          />
          {!hasMarks && (
            <Button
              type="primary"
              htmlType="submit"
              style={{ marginTop: 16 }}
              disabled={isLoading}
              loading={isLoading}
            >
              Submit
            </Button>
          )}
        </Form>
      )}
    </Formik>
  );
};

export default EditableTable;
