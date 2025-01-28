import { Button, Input, Table } from "antd";
import { Field, Form, Formik } from "formik";

const EditableTable = ({ questionsData }: any) => {
  console.log("line 5 ", questionsData);
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
        obtainedMarks: 0,
      };
    }),
  };

  console.log("line 24 ", initialValues);

  const handleSubmit = (values: any) => {
    console.log("Updated values:", values);
  };

  const columns = [
    {
      title: "Question No.",
      dataIndex: "id",
      render: (text: any) => <span>{text}</span>,
    },
    {
      title: "Marks",
      dataIndex: "marks",
      render: (text: any) => <span>{text}</span>,
    },
    {
      title: "Obtained Marks",
      dataIndex: "obtainedMarks",
      render: (_, record: any, index: number) => (
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
          <Button type="primary" htmlType="submit" style={{ marginTop: 16 }}>
            Submit
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default EditableTable;
