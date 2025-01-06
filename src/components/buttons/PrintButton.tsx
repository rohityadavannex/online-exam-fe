import { PrintIcon } from "src/icons";
import Button from "./Button";

const PrintButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <Button icon={<PrintIcon />} onClick={onClick}>
      Print
    </Button>
  );
};

export default PrintButton;
