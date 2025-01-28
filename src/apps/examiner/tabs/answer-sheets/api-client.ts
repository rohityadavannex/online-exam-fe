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
  return useGet(`/collage/student${getQueryData({ length, page, search })}`);
};
