import { GetProp, Upload, UploadProps } from "antd";
import useNotification from "src/hooks/useNotification";
import { ElementWithWrapper } from "../inputs/Input";
type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

const UploadImage = ({
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
  console.log("line 25 ", value);
  const { errorNotification, successNotification } = useNotification();

  const handleImageChange = (info: any) => {
    onChange(info.file.originFileObj);
  };

  const beforeUpload = (file: FileType) => {
    const isJpgOrPng =
      file?.type === "image/jpeg" || file?.type === "image/png";
    if (imageOnly && !isJpgOrPng) {
      errorNotification("You can only upload JPG/PNG file!");
    }
    const isLt2M = file.size / 1024 / 1024 < maxSize;
    if (!isLt2M) {
      errorNotification("Image must smaller than 2MB!");
    }
    return isJpgOrPng && isLt2M;
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
          <img
            src={
              typeof value === "string"
                ? `${process.env.REACT_APP_API_URL}/uploads/${value}`
                : URL.createObjectURL(value as unknown as FileType)
            }
            alt="avatar"
            style={{ width: "100%", height: "100%" }}
            className="rounded-md object-cover"
          />
        ) : (
          uploadButton
        )}
      </Upload>
    </ElementWithWrapper>
  );
};

export default UploadImage;
