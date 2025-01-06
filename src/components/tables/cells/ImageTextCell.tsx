import { Image } from "antd";
import classNames from "classnames";
import { getImageUrl } from "src/helpers/helpers";
import { ViewIcon } from "src/icons";
import FallbackUser from "src/images/fallback-user.jpeg";
import TextCell from "./TextCell";

const ImageTextCell = ({
  src,
  value,
  className,
}: {
  src?: string;
  value: string | number;
  className?: string;
}) => {
  return (
    <div className={classNames("flex", className)}>
      <Image
        src={src ? getImageUrl(src) : FallbackUser}
        alt={value?.toString()}
        className="rounded-full"
        width={"50px"}
        preview={{
          mask: <ViewIcon color="#FFFFFF" />,
        }}
      />
      <TextCell value={value} className="justify-center" />
    </div>
  );
};

export default ImageTextCell;
