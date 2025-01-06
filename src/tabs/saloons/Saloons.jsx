import { useNavigate } from "react-router-dom";
import { TAB_NAMES } from "src/apps/common/menu-navigation/menuNavigation";
import ButtonV1 from "src/components/buttons/ButtonV1";
import useSetActiveTab from "src/hooks/useSetActiveTab";
import DummySaloons from "./DummySaloons";

const Saloons = () => {
  useSetActiveTab(TAB_NAMES.SALOONS);
  const navigate = useNavigate();
  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <span className="text-lg font-semibold">All Members</span>
        <ButtonV1
          text="Add Member"
          onClick={() => navigate("/saloons/create")}
        />
      </div>

      <div className="flex rounded-xl bg-white w-full">
        <DummySaloons />
      </div>
    </div>
  );
};

export default Saloons;
