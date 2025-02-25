import { GetProp, Upload, UploadProps } from "antd";
import useNotification from "src/hooks/useNotification";
import { ElementWithWrapper } from "../inputs/Input";
type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

const UploadFile = ({
  value,
  onChange,
  label,
  error,
  wrapperClassName,
  imageOnly = true,
  required,
  maxSize = 2,
}: {
  value: string | FileType;
  onChange: (value: FileType) => void;
  label: string;
  error: string | undefined;
  wrapperClassName?: string;
  imageOnly?: boolean;
  required?: boolean;
  maxSize?: number;
}) => {
  const { errorNotification, successNotification } = useNotification();

  const handleImageChange = (info: any) => {
    onChange(info.file.originFileObj);
  };

  const beforeUpload = (file: FileType) => {
    console.log("line 32 ", file);
    const isPdf = file?.type === "application/pdf";
    if (imageOnly && !isPdf) {
      errorNotification("You can only upload JPG/PNG file!");
    }
    const isLt2M = file.size / 1024 / 1024 < maxSize;
    if (!isLt2M) {
      errorNotification("Image must smaller than 2MB!");
    }
    return isPdf && isLt2M;
  };

  const uploadButton = (
    <button style={{ border: 0, background: "none" }} type="button">
      {/* {loading ? <LoadingOutlined /> : <PlusOutlined />} */}
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );

  return (
    <ElementWithWrapper label={label} required error={error}>
      <Upload
        listType="picture-card"
        //className="avatar-uploader"
        //listType="picture-circle"
        showUploadList={false}
        beforeUpload={beforeUpload}
        onChange={handleImageChange}
        customRequest={() => {}}
      >
        {value ? (
          <div>{typeof value === "object" ? value?.name : value}</div>
        ) : (
          uploadButton
        )}
      </Upload>
    </ElementWithWrapper>
  );
};

export default UploadFile;
