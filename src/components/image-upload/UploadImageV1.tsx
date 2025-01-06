import { ChangeEvent, useCallback, useMemo } from "react";
import { useDropzone } from "react-dropzone";
import { formatFileSize, getImageUrl } from "src/helpers/helpers";
import { DeleteIcon } from "src/icons/DeleteIcon";
import { DownloadIcon } from "src/icons/DownloadIcon";
import { FileUploadIcon } from "src/icons/FileUploadIcon";
import { PdfIcon } from "src/icons/PdfIcon";
import ButtonV1 from "../buttons/ButtonV1";
import { ElementWithWrapper } from "../inputs/Input";

const UploadImage = ({
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
  const onDrop = useCallback(
    (acceptedFiles: any) => {
      onChange(acceptedFiles[0]);
    },
    [onChange]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles: 1,
  });

  const selectImage = useMemo(() => {
    return (
      <div className="border-dashed py-4 px-10 border-2 rounded-xl cursor-pointer">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex gap-3 items-center">
            <FileUploadIcon color="#28303F" className="shrink-0" />
            <div className="flex flex-col gap-2">
              <div className="font-semibold">
                Choose a file or drag & drop it here
              </div>
              <div className="text-xs text-gray-ash">
                JPEG, PNG, PDG, and MP4 formats, up to 50MB
              </div>
            </div>
          </div>
          <ButtonV1 text={"Browse File"} className="h-[30px]" />
        </div>
      </div>
    );
  }, []);

  const selectedImage = useMemo(() => {
    return (
      <div className="py-4 px-10 rounded-xl cursor-pointer bg-blue-pale">
        <div className="flex justify-between items-center gap-4">
          <div className="flex gap-3 items-center">
            {getFileIcons(value?.name ?? "")}
            <div className="flex flex-col gap-2">
              <div className="font-semibold">{value?.name}</div>
              <div className="text-xs text-gray-ash">
                {value?.size ? formatFileSize(value?.size) : ""}
              </div>
            </div>
          </div>
          <div className="flex gap-3">
            {typeof value === "string" && (
              <ButtonV1
                icon={() => <DownloadIcon className="h-4" color="#202224" />}
                onClick={(e) => {
                  window.open(getImageUrl(value), "_blank")!.focus();
                  e.stopPropagation();
                }}
              />
            )}
            {canDelete && (
              <ButtonV1
                icon={() => <DeleteIcon className="h-4" />}
                onClick={(e) => {
                  onClear();
                  e.stopPropagation();
                }}
              />
            )}
          </div>
        </div>
      </div>
    );
  }, [onClear, value]);

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
        {value ? selectedImage : selectImage}
      </div>
    </ElementWithWrapper>
  );
};

export default UploadImage;

const getFileIcons = (fileType: string) => {
  if (fileType.includes("jpeg")) {
    return <PdfIcon className="shrink-0" />;
  }
  return <PdfIcon className="shrink-0" />;
};
