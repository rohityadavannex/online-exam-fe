import Dropdown from "src/components/dropdowns/Dropdown";

const ShowingCountDropdown = ({
  setLength,
  length = 10,
}: {
  length: number;
  setLength: (val: number) => void;
}) => {
  return (
    <div className="flex items-center gap-[20px]">
      <span>Showing</span>
      <Dropdown
        options={rowCountOptions}
        value={length}
        onChange={(val) => setLength(val as number)}
        className="!bg-white !px-4 gap-[12px]"
      />
    </div>
  );
};

export default ShowingCountDropdown;

const rowCountOptions = [
  {
    label: 10,
    value: 10,
  },
  {
    label: 20,
    value: 20,
  },
  {
    label: 30,
    value: 30,
  },
  {
    label: 40,
    value: 40,
  },
  {
    label: 50,
    value: 50,
  },
];
