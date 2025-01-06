import { notification } from "antd";
import {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
} from "react";

type NotificationType = {
  successNotification: (message?: string) => void;
  errorNotification: (message?: string) => void;
};

const NotificationContext = createContext({} as NotificationType);
const NotificationContextProvider = ({ children }: PropsWithChildren) => {
  const [api, contextHolder] = notification.useNotification();

  const successNotification = useCallback(
    (message?: string) => {
      api.success({
        message: message ?? "Changes made Successfully.",
        duration: 20,
      });
    },
    [api]
  );

  const errorNotification = useCallback(
    (message?: string) => {
      api.error({
        message: message ?? "Something went wrong.",
        duration: 20,
      });
    },
    [api]
  );

  return (
    <>
      {contextHolder}
      <NotificationContext.Provider
        value={{ errorNotification, successNotification }}
      >
        {children}
      </NotificationContext.Provider>
    </>
  );
};

export default NotificationContextProvider;

export const useNotification = () => {
  return useContext(NotificationContext);
};
