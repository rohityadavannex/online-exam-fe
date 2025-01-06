import { Spin } from "antd";
import { useSelector } from "react-redux";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { AuthRoute } from "src/App";
import { checkViewAccess, isAppInitialized } from "src/redux/selectors/app";
import ForgotPassword from "src/tabs/auth/forgot-password/ForgotPassword";
import Login from "src/tabs/auth/Login";
import Register from "src/tabs/auth/register/Register";
import ResetPassword from "src/tabs/auth/reset-password/ResetPassword";
import VerifyEmail from "src/tabs/auth/verify-email/VerifyEmail";

function UserRoutes() {
  const navigate = useNavigate();
  const isInitialized = useSelector(isAppInitialized);

  const hasViewAccessToTab = useSelector((state) => checkViewAccess(state));

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/verify-email/:token?" element={<VerifyEmail />} />
      <Route path="/reset-password/:token?" element={<ResetPassword />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />

      <Route path="/" element={<AuthRoute />}>
        <Route
          index
          element={
            !isInitialized ? (
              <div className="flex justify-center items-center h-full">
                <Spin size="large" />
              </div>
            ) : (
              <Navigate to={"/dashboard"} />
            )
          }
        />
      </Route>

      <Route
        path="*"
        element={
          <div className="flex justify-center items-center h-full">404</div>
        }
      />
    </Routes>
  );
}

export default UserRoutes;
