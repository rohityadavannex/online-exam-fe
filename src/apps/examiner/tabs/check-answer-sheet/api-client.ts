import { useGet, usePost } from "src/http-clients/clients";

export const useGetAnswerSheetInfo = ({ sheetId }: { sheetId: number }) => {
  return useGet(`/examiners/answer-sheets/${sheetId}/info`);
};

export const useAddMarksForAnswerSheet = ({ sheetId }: { sheetId: number }) => {
  return usePost(`/examiners/answer-sheets/${sheetId}/add-marks`);
};
