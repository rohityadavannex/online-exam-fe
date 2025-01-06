import { useCallback } from "react";
import { toast } from "react-toastify";

const useNotification = () => {
  const successNotification = useCallback((text?: string) => {
    toast.success(text ?? "Changes Successful");
  }, []);

  const errorNotification = useCallback((text?: string) => {
    toast.error(text ?? "Something went wrong.");
  }, []);

  return { successNotification, errorNotification };
};

export default useNotification;
