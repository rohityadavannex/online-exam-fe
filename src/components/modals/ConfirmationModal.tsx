import { WarningIcon } from "src/icons/WarningIcon";
import ButtonV1 from "../buttons/ButtonV1";
import Modal from "./Modal";

const ConfirmationModal = ({
  isOpen,
  onClose,
  isLoading = false,
  onSubmit,
  title = "Delete",
  heading = "You Are about to delete data.",
  subHeading = "Do you really want to delete these records ? This process cannot be undone.",
  buttonText = "Delete",
}: {
  isOpen: boolean;
  onClose: () => void;
  isLoading: boolean;
  onSubmit: () => void;
  title?: string;
  heading?: string;
  subHeading?: string;
  buttonText?: string;
}) => {
  return (
    <Modal isOpen={isOpen} closeModal={onClose} title={title}>
      <div className="flex flex-col items-center min-w-[300px]">
        <WarningIcon />
        <p className="mt-[26px] text-xl font-semibold text-black-raisin">
          {heading}
        </p>
        <p className="text-base mt-[9px] text-black-coral w-[80%] text-center">
          {subHeading}
        </p>
        <div className="flex gap-[25px] justify-end items-center h-[70px] bg-[#f7f7f7] w-full mt-[30px] mx-[-20px] px-[20px]">
          <ButtonV1
            text="Cancel"
            className="h-[40px] !px-6"
            onClick={onClose}
          />
          <ButtonV1
            text={isLoading ? "Loading..." : buttonText}
            className="h-[40px] !px-6"
            danger={true}
            onClick={onSubmit}
          />
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmationModal;
