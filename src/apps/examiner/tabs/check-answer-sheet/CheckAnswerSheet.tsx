import { useMemo } from "react";
import { useParams } from "react-router-dom";
import { TAB_NAMES } from "src/apps/common/menu-navigation/menuNavigation";
import TabHeader from "src/apps/common/tab-header/TabHeader";
import useSetActiveTab from "src/hooks/useSetActiveTab";
import { useGetAnswerSheetInfo } from "./api-client";
import EditableTable from "./EditableTable";

const CheckAnswerSheet = () => {
  useSetActiveTab(TAB_NAMES.ANSWER_SHEETS);

  const { sheetId } = useParams();
  const { isLoading, data } = useGetAnswerSheetInfo({
    sheetId: Number(sheetId),
  });

  const sheetData = useMemo(() => data?.data ?? {}, [data?.data]);

  const questionsData = useMemo(
    () => sheetData?.questions ?? [],
    [sheetData?.questions]
  );

  console.log("line 15 ", data);

  return (
    <div className="flex flex-col gap-6">
      <TabHeader label="Check Answer Sheets" />
      <div className="bg-white rounded-lg px-6 py-9 flex flex-col gap-5">
        <div className="grid grid-cols-6 gap-3">
          <iframe
            src={
              sheetData
                ? `${process.env.REACT_APP_API_URL}/uploads/${sheetData?.sheet?.answerSheet}`
                : undefined
            }
            className="w-full h-[520px] col-span-4"
            title="answer sheet"
          />
          {/* <div className="grid grid-cols-3 col-span-2">
            <div className="text-center">Question</div>
            <div className="text-center">Marks</div>
            <div className="text-center">Obtained Marks</div>
            {questionsData.map((question: any, index: number) => {
              return (
                <>
                  <div className="text-center">{index + 1}</div>
                  <div className="text-center">{question?.marks ?? 0}</div>
                </>
              );
            })}
          </div> */}
          <EditableTable questionsData={questionsData} />
        </div>
      </div>
    </div>
  );
};

export default CheckAnswerSheet;
