import { ChangeEvent, useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { getImageUrl } from "src/helpers/helpers";
import { EditIcon, UserIcon } from "src/icons";
import { ElementWithWrapper } from "../inputs/Input";

const UploadProfileImage = ({
  label,
  name,
  error,
  onChange,
  value,
  disabled = false,
  required = false,
  className,
  onClear,
  canDelete = true,
}: {
  name: string;
  disabled?: boolean;
  placeholder?: string;
  error?: string;
  label: string;
  value: File;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  className?: string;
  onClear: () => void;
  canDelete?: boolean;
}) => {
  const [path, setPath] = useState(
    value ? getImageUrl(value.toString()) : <UserIcon />
  );

  const onDrop = useCallback(
    (acceptedFiles: any) => {
      onChange(acceptedFiles[0]);
      setPath(URL.createObjectURL(acceptedFiles[0]));
    },
    [onChange]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles: 1,
  });

  return (
    <ElementWithWrapper
      name={name}
      label={label}
      error={error}
      required={required}
      className={className}
    >
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        <div
          className="w-[113px] h-[110px] rounded-full bg-cover relative"
          style={{ backgroundImage: `url(${value ? path : <UserIcon />})` }}
        >
          <div className="absolute right-2 bottom-2 !bg-primary p-[7px] rounded-full">
            <EditIcon color="#FFFFFF" />
          </div>
        </div>
      </div>
    </ElementWithWrapper>
  );
};

export default UploadProfileImage;
