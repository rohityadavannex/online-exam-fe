import Modal from "src/components/modals/Modal";

const TermsAndConditionModal = ({
  isOpen,
  closeModal,
}: {
  isOpen: boolean;
  closeModal: () => void;
}) => {
  return (
    <Modal isOpen={isOpen} closeModal={closeModal} title="Terms & Conditions">
      <div className="flex flex-col gap-4">
        <div className="text-lg font-bold">Your Agreement</div>
        <div className="flex flex-col gap-4 text-gray-dim">
          <div className="text-base">
            <p>Last Revised: July 16, 2024</p>
            <p>
              Welcome to www.lorem-ipsum.info. This site is provided as a
              service to our visitors and may be used for informational purposes
              only. Because the Terms and Conditions contain legal obligations,
              please read them carefully
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <div className="text-md">1. Your Agreement</div>
            <p>
              By using this Site, you agree to be bound by, and to comply with,
              these Terms and Conditions. If you do not agree to these Terms and
              Conditions, please do not use this site. PLEASE NOTE: We reserve
              the right, at our sole discretion, to change, modify or otherwise
              alter these Terms and Conditions at any time. Unless otherwise
              indicated, amendments will become effective immediately. Please
              review these Terms and Conditions periodically. Your continued use
              of the Site following the posting of changes and/or modifications
              will constitute your acceptance of the revised Terms and
              Conditions and the reasonableness of these standards for notice of
              changes. For your information, this page was last updated as of
              the date at the top of these terms and conditions
            </p>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default TermsAndConditionModal;
