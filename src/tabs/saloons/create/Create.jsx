import { ChevronLeftIcon, PhotoIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";
import ButtonV1 from "../../../components/buttons/ButtonV1";
import Input from "../../../components/inputs/Input";

const SaloonsCreate = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col bg-white w-full rounded-xl">
      <div className="text-xl font-bold flex justify-between items-center p-5">
        <div className="flex items-center gap-4">
          <div
            className="rounded-full h-10 w-10 flex p-3 justify-center items-center bg-[#F4F7FE] cursor-pointer"
            onClick={() => navigate(-1)}
          >
            <ChevronLeftIcon />
          </div>
          <span>Add Member</span>
        </div>
        <ButtonV1 text="Submit" className={"w-[280px]"} />
      </div>
      <HorizontalSeparator />
      <div className="flex flex-col gap-3 p-5">
        <div className="text-xl font-semibold text-gray-600">
          Personal Information
        </div>
        <div className="grid grid-cols-2 gap-5">
          <Input label={"Full Name"} type={"text"} />
          <Input label={"Email"} type={"email"} />
          <Input label={"Mobile"} type={"text"} />
          <Input label={"Joining Date"} type={"text"} />
          <Input label={"Duration"} type={"text"} />
          <CoverPhoto />
        </div>
      </div>
      <HorizontalSeparator />
      <div className="flex flex-col gap-3 p-5">
        <div className="text-xl font-semibold text-gray-600">
          Payment Information
        </div>
        <div className="grid grid-cols-2 gap-5">
          <Input label={"Payment Mode"} type={"text"} />
          <Input label={"Payment Status"} type={"text"} />
          <Input label={"Amount"} type={"email"} />
          <Input label={"Payment Date"} type={"text"} />
        </div>
      </div>
    </div>
  );
};

export default SaloonsCreate;

const CoverPhoto = () => {
  return (
    <div>
      <label
        htmlFor="cover-photo"
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        Profile photo
      </label>
      <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
        <div className="text-center">
          <PhotoIcon
            className="mx-auto h-12 w-12 text-gray-300"
            aria-hidden="true"
          />
          <div className="mt-4 flex text-sm leading-6 text-gray-600">
            <label
              htmlFor="file-upload"
              className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
            >
              <span>Upload a file</span>
              <input
                id="file-upload"
                name="file-upload"
                type="file"
                className="sr-only"
              />
            </label>
            <p className="pl-1">or drag and drop</p>
          </div>
          <p className="text-xs leading-5 text-gray-600">
            PNG, JPG, GIF up to 10MB
          </p>
        </div>
      </div>
    </div>
  );
};

const HorizontalSeparator = () => {
  return (
    <div className="w-full bg-gradient-to-r from-[#F4F7FE] bg-white h-[1px] py-[1px]"></div>
  );
};
