import { PropsWithChildren, useEffect } from "react";
import { default as ReactModal } from "react-modal";
import { CloseIcon } from "src/icons/CloseIcon";

const Modal = ({
  isOpen,
  closeModal,
  children,
  title = "",
}: PropsWithChildren<{
  isOpen: boolean;
  closeModal: () => void;
  title?: string;
}>) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Example Modal"
    >
      <div className="flex flex-col max-w-[1000px] gap-3">
        <div className="flex flex-row justify-between">
          <span className="text-2xl font-bold	">{title}</span>
          <div className="cursor-pointer" onClick={closeModal}>
            <CloseIcon />
          </div>
        </div>
        {children}
      </div>
    </ReactModal>
  );
};

export default Modal;

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    borderRadius: "16px",
    maxHeight: "96vh",
    maxWidth: "90vw",
  },
  overlay: {
    backgroundColor: "rgb(0 0 0 / 75%)",
  },
};
