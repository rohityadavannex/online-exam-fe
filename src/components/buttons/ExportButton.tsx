import { ExportIcon } from "src/icons";
import Button from "./Button";

const ExportButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <Button icon={<ExportIcon />} onClick={onClick}>
      Export
    </Button>
  );
};

export default ExportButton;
