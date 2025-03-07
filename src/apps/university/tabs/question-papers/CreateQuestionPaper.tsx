import { FieldArray, FormikProvider, useFormik } from "formik";
import React, { useCallback, useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import { TAB_NAMES } from "src/apps/common/menu-navigation/menuNavigation";
import TabHeader from "src/apps/common/tab-header/TabHeader";
import Button from "src/components/buttons/Button";
import Input from "src/components/inputs/Input";
import { generateRandomId } from "src/helpers/helpers";
import useNotification from "src/hooks/useNotification";
import useSetActiveTab from "src/hooks/useSetActiveTab";
import {
  useCreateQuestionForExam,
  useGetQuestionForExam,
  useUpdateQuestionForExam,
} from "./api-client";
import TextEditor from "./TextEditor";

enum FORM_FIELDS {
  QUESTIONS = "questions",
}

interface AlternateQuestion {
  id: string;
  question: string;
  marks: number | null;
}

interface QuestionItem {
  id: string;
  question: string;
  marks: number | null;
  alternates: AlternateQuestion[];
}

const CreateQuestionPaper: React.FC = () => {
  useSetActiveTab(TAB_NAMES.EXAM);
  const { errorNotification, successNotification } = useNotification();
  const { examId, subjectId } = useParams();

  const {
    isLoading,
    execute: createQuestionsForExam,
    isSuccess: isCreateSuccess,
    error: createError,
  } = useCreateQuestionForExam({
    examId: Number(examId),
    subjectId: Number(subjectId),
  });

  const {
    isLoading: isUpdateLoading,
    execute: updateQuestionsForExam,
    isSuccess: isUpdateSuccess,
    error: updateError,
  } = useUpdateQuestionForExam({
    examId: Number(examId),
    subjectId: Number(subjectId),
  });

  const { isLoading: isGetQuestionsLoading, data: examQuestionsRes } =
    useGetQuestionForExam({
      examId: Number(examId),
      subjectId: Number(subjectId),
    });

  const examQuestions = useMemo(
    () => examQuestionsRes?.data?.rows ?? [],
    [examQuestionsRes?.data?.rows]
  );

  const initialQuestionItem: QuestionItem = useMemo(
    () => ({
      id: generateRandomId(),
      question: "",
      marks: null,
      alternates: [],
    }),
    []
  );

  const initialValues = useMemo(() => {
    return examQuestions.length > 0 ? examQuestions : [initialQuestionItem];
  }, [examQuestions, initialQuestionItem]);

  console.log("line 85 ", initialValues);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      [FORM_FIELDS.QUESTIONS]: initialValues,
    },
    // validationSchema: object({
    //   [FORM_FIELDS.QUESTIONS]: object().required("Questions are required"),
    // }),
    onSubmit: (values) => {
      console.log("Form submitted ", values);
      if (examQuestions.length > 0) {
        updateQuestionsForExam(values);
        return;
      }
      createQuestionsForExam(values);
    },
  });

  const { values, handleSubmit, setFieldValue } = formik;

  const handleAddQuestion = useCallback(() => {
    const newQuestion: QuestionItem = {
      id: generateRandomId(),
      question: "",
      marks: null,
      alternates: [],
    };

    setFieldValue(FORM_FIELDS.QUESTIONS, [
      ...values[FORM_FIELDS.QUESTIONS],
      newQuestion,
    ]);
  }, [values, setFieldValue]);

  const handleRemoveQuestion = useCallback(
    (index: number) => {
      const updatedQuestions = values[FORM_FIELDS.QUESTIONS].filter(
        (_, i) => i !== index
      );
      setFieldValue(FORM_FIELDS.QUESTIONS, updatedQuestions);
    },
    [values, setFieldValue]
  );

  const handleAddAlternateQuestion = useCallback(
    (index: number) => {
      const newAlternateQuestion: AlternateQuestion = {
        id: generateRandomId(),
        question: "",
        marks: null,
      };

      const updatedQuestions = [...values[FORM_FIELDS.QUESTIONS]];
      updatedQuestions[index].alternates.push(newAlternateQuestion);
      setFieldValue(FORM_FIELDS.QUESTIONS, updatedQuestions);
    },
    [values, setFieldValue]
  );

  const handleRemoveAlternateQuestion = useCallback(
    (questionIndex: number, alternateIndex: number) => {
      const updatedQuestions = [...values[FORM_FIELDS.QUESTIONS]];
      updatedQuestions[questionIndex].alternates.splice(alternateIndex, 1);
      setFieldValue(FORM_FIELDS.QUESTIONS, updatedQuestions);
    },
    [values, setFieldValue]
  );

  useEffect(() => {
    if (isCreateSuccess || isUpdateSuccess) {
      successNotification("Questions Added");
    }
    if (createError || updateError) {
      errorNotification("Something went wrong");
    }
  }, [
    createError,
    errorNotification,
    isCreateSuccess,
    isUpdateSuccess,
    successNotification,
    updateError,
  ]);

  return (
    <div className="flex flex-col gap-6">
      <TabHeader label="Add Questions" />
      <div className="flex flex-col bg-white rounded-md py-[42px] px-[34px] gap-6 max-w-[60%]">
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <>
            {" "}
            <FormikProvider value={formik}>
              <FieldArray name={FORM_FIELDS.QUESTIONS}>
                {() => (
                  <>
                    {values[FORM_FIELDS.QUESTIONS].map((item, index) => (
                      <div
                        key={item.id}
                        className="flex flex-col items-center gap-2 w-full border-2 p-6 rounded-lg"
                      >
                        <div className="flex w-full justify-start text-lg font-medium">
                          {`Question ${index + 1}`}
                        </div>
                        <TextEditor
                          onChange={(value: any) => {
                            const updatedQuestions = [
                              ...values[FORM_FIELDS.QUESTIONS],
                            ];
                            updatedQuestions[index].question = value;
                            setFieldValue(
                              FORM_FIELDS.QUESTIONS,
                              updatedQuestions
                            );
                          }}
                          initialValue={item.question}
                        />
                        <div className="flex flex-col w-full gap-3">
                          <Input
                            type="number"
                            placeholder="Marks"
                            value={item.marks || ""}
                            onChange={(e) => {
                              const updatedQuestions = [
                                ...values[FORM_FIELDS.QUESTIONS],
                              ];
                              updatedQuestions[index].marks = e.target.value
                                ? Number(e.target.value)
                                : null;
                              setFieldValue(
                                FORM_FIELDS.QUESTIONS,
                                updatedQuestions
                              );
                            }}
                            error=""
                          />
                          <div className="flex gap-4">
                            <Button onClick={() => handleRemoveQuestion(index)}>
                              Remove
                            </Button>
                            <Button
                              onClick={() => handleAddAlternateQuestion(index)}
                            >
                              Add Alternate Question
                            </Button>
                          </div>
                        </div>

                        {/* Render Alternate Questions */}
                        {item.alternates.map((altItem, altIndex) => (
                          <div
                            key={altItem.id}
                            className="flex flex-col items-center gap-2 w-full border-2 bg-slate-50 p-4 rounded-lg mt-4"
                          >
                            <div className="flex w-full justify-start text-lg font-medium">
                              {`Alternate Question ${altIndex + 1}`}
                            </div>
                            <TextEditor
                              onChange={(value: any) => {
                                const updatedQuestions = [
                                  ...values[FORM_FIELDS.QUESTIONS],
                                ];
                                updatedQuestions[index].alternates[
                                  altIndex
                                ].question = value;
                                setFieldValue(
                                  FORM_FIELDS.QUESTIONS,
                                  updatedQuestions
                                );
                              }}
                              initialValue={altItem.question}
                            />
                            <div className="flex flex-col w-full gap-3">
                              <Input
                                type="number"
                                placeholder="Marks"
                                value={altItem.marks || ""}
                                onChange={(e) => {
                                  const updatedQuestions = [
                                    ...values[FORM_FIELDS.QUESTIONS],
                                  ];
                                  updatedQuestions[index].alternates[
                                    altIndex
                                  ].marks = e.target.value
                                    ? Number(e.target.value)
                                    : null;
                                  setFieldValue(
                                    FORM_FIELDS.QUESTIONS,
                                    updatedQuestions
                                  );
                                }}
                                error=""
                              />
                              <Button
                                onClick={() =>
                                  handleRemoveAlternateQuestion(index, altIndex)
                                }
                              >
                                Remove Alternate
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    ))}
                    <Button
                      onClick={() => handleAddQuestion()}
                      loading={isLoading}
                    >
                      Add Question
                    </Button>
                  </>
                )}
              </FieldArray>
            </FormikProvider>
            <Button
              type="primary"
              onClick={() => handleSubmit()}
              loading={isLoading}
            >
              Submit
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default CreateQuestionPaper;
