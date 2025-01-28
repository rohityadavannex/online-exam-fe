import { useGet, usePost } from "src/http-clients/clients";

export const useGetAnswerSheetInfo = ({
  sheetId,
  subjectId,
}: {
  sheetId: number;
  subjectId: number;
}) => {
  return useGet(`/examiners/answer-sheets/${subjectId}/${sheetId}/info`);
};

export const useAddMarksForAnswerSheet = ({ sheetId }: { sheetId: number }) => {
  return usePost(`/examiners/answer-sheets/${sheetId}/add-marks`);
};
