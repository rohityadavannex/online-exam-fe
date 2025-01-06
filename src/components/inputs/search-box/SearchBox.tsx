import { SearchIcon } from "src/icons";
import Input from "../Input";

const SearchBox = () => {
  return (
    <Input
      className="!h-8 !rounded-lg"
      error={undefined}
      placeholder="Search"
      prefix={<SearchIcon color="#000000" />}
    />
  );
};

export default SearchBox;
