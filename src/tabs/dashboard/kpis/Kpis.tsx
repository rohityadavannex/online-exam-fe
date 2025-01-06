import { DollarIcon, ListIcon2, TeamIcon, WalletIcon } from "src/icons";
import KpiCard from "./KpiCard";

const Kpis = () => {
  return (
    <div className="grid grid-cols-350px gap-[40px]">
      <KpiCard
        icon={<TeamIcon />}
        title="Total Students"
        count={1673}
        subTitle="+200"
        subTitleColor="bg-[#DCFCE7]"
        bgColorBox="bg-[#487FFF]"
        bgColorClassname="bg-gradient-to-r from-[#487FFF1A] to-[#487FFF00]"
      />
      <KpiCard
        icon={<WalletIcon />}
        title="New Admissions"
        count={568}
        subTitle="-200"
        subTitleColor="bg-[#FEE2E2]"
        bgColorBox="bg-[#E02424]"
        bgColorClassname="bg-gradient-to-r from-[#7E3AF21A] to-[#7E3AF200]"
      />
      <KpiCard
        icon={<ListIcon2 />}
        title="SMS SENT (DEC)"
        count={15000}
        subTitle="+200"
        subTitleColor="bg-[#DCFCE7]"
        bgColorBox="bg-[#00A991]"
        bgColorClassname="bg-gradient-to-r from-[#00A9911A] to-[#00A99100]"
      />
      <KpiCard
        icon={<DollarIcon />}
        title="Birthdays"
        count={15}
        subTitle="+10"
        subTitleColor="bg-[#DCFCE7]"
        bgColorBox="bg-[#E89125]"
        bgColorClassname="bg-gradient-to-r from-[#E891251A] to-[#E8912500]"
      />
      <KpiCard
        icon={<TeamIcon />}
        title="Total Students"
        count={1673}
        subTitle="+200"
        subTitleColor="bg-[#DCFCE7]"
        bgColorBox="bg-[#D61F69]"
        bgColorClassname="bg-gradient-to-r from-[#D61F691A] to-[#D61F6900]"
      />
      <KpiCard
        icon={<WalletIcon />}
        title="New Admissions"
        count={568}
        subTitle="-200"
        subTitleColor="bg-[#FEE2E2]"
        bgColorBox="bg-[#00B8F2]"
        bgColorClassname="bg-gradient-to-r from-[#00B8F21A] to-[#00B8F200]"
      />
      <KpiCard
        icon={<ListIcon2 />}
        title="SMS SENT (DEC)"
        count={15000}
        subTitle="+200"
        subTitleColor="bg-[#DCFCE7]"
        bgColorBox="bg-[#378BD0]"
        bgColorClassname="bg-gradient-to-r from-[#378BD01A] to-[#378BD000]"
      />
      <KpiCard
        icon={<DollarIcon />}
        title="Birthdays"
        count={15}
        subTitle="+10"
        subTitleColor="bg-[#DCFCE7]"
        bgColorBox="bg-[#487fff]"
        bgColorClassname="bg-gradient-to-r from-[#487FFF1A] to-[#487FFF00]"
      />
    </div>
  );
};

export default Kpis;
