import { useSelector } from "react-redux";
import { getQueryData } from "src/helpers/helpers";
import { useGet } from "src/http-clients/clients";
import { getCurrentUserInfo } from "src/redux/selectors/app";

export const useGetExamsList = ({
  length,
  page,
  search = "",
}: {
  length: number;
  page: number;
  search?: string;
}) => {
  const uniData = useSelector(getCurrentUserInfo);
  return useGet(
    `/university/${uniData.uniId}/exams${getQueryData({
      length,
      page,
      search,
    })}`
  );
};
