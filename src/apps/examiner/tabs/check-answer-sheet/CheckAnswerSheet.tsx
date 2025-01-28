import { useMemo } from "react";
import { useParams } from "react-router-dom";
import { TAB_NAMES } from "src/apps/common/menu-navigation/menuNavigation";
import TabHeader from "src/apps/common/tab-header/TabHeader";
import useSetActiveTab from "src/hooks/useSetActiveTab";
import { useGetAnswerSheetInfo } from "./api-client";

const CheckAnswerSheet = () => {
  useSetActiveTab(TAB_NAMES.ANSWER_SHEETS);

  const { sheetId } = useParams();
  const { isLoading, data } = useGetAnswerSheetInfo({
    sheetId: Number(sheetId),
  });

  const sheetData = useMemo(() => data?.data ?? {}, [data?.data]);

  console.log("line 15 ", data);

  return (
    <div className="flex flex-col gap-6">
      <TabHeader label="Check Answer Sheets" />
      <div className="bg-white rounded-lg px-6 py-9 flex flex-col gap-5">
        <div className="grid grid-cols-6 h-full">
          <iframe
            src={
              sheetData
                ? `${process.env.REACT_APP_API_URL}/uploads/${sheetData?.answerSheet}`
                : undefined
            }
            className="w-full h-[520px] col-span-4"
            title="answer sheet"
          />
        </div>
      </div>
    </div>
  );
};

export default CheckAnswerSheet;
