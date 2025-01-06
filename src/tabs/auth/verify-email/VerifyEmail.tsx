import { Spin } from "antd";
import { useEffect, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import StatusCard from "src/components/cards/StatusCard";
import useNotification from "src/hooks/useNotification";
import { useVerifyEmail } from "../api-client";
import PublicLayout from "../PublicLayout";

const VerifyEmail = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const { errorNotification } = useNotification();
  const { execute, isLoading, isSuccess, error } = useVerifyEmail();

  useEffect(() => {
    if (error) {
      const errorStatus = error?.cause?.status;
      if (errorStatus === 400) {
        errorNotification("Invalid Token.");
      } else if (errorStatus === 401) {
        errorNotification("Token Expired.");
      } else {
        errorNotification();
      }
    }
  }, [error, errorNotification]);

  const isSuccessFul = useMemo(() => isSuccess && !error, [error, isSuccess]);

  useEffect(() => {
    if (isSuccessFul) {
      const timeOutId = setTimeout(() => {
        navigate("/login");
      }, 3000);

      return () => clearTimeout(timeOutId);
    }
  }, [isSuccessFul, navigate]);

  useEffect(() => {
    if (token) {
      execute({ token });
    }
  }, [token]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <PublicLayout
      leftSection={{
        heading: "Verify Email",
        features: [
          {
            text: "We ensure a smooth and hassle-free email verification process for you.",
          },
        ],
      }}
    >
      {isSuccessFul && (
        <StatusCard
          title="Successfully verified your email."
          subtitle="Your email has been verified successfully."
        />
      )}

      {error && (
        <StatusCard
          title="Something Went Wrong."
          subtitle="Something went wrong while verification. Please retry or please contact our support team immediately."
          error
        />
      )}
    </PublicLayout>
  );
};

export default VerifyEmail;
