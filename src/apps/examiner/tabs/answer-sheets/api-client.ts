import { getQueryData } from "src/helpers/helpers";
import { useGet } from "src/http-clients/clients";

export const useGetAnswerSheets = ({
  length,
  page,
  search = "",
}: {
  length: number;
  page: number;
  search?: string;
}) => {
  return useGet(
    `/examiners/answer-sheets${getQueryData({ length, page, search })}`
  );
};
