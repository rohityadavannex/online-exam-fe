import { useGet } from "src/http-clients/clients";

export const useGetAnswerSheetInfo = ({ sheetId }: { sheetId: number }) => {
  return useGet(`/examiners/answer-sheets/${sheetId}/info`);
};
