import { Spin } from "antd";
import { useSelector } from "react-redux";
import { Route, Routes, useNavigate } from "react-router-dom";
import { AuthRoute } from "src/App";
import { getCurrentUserInfo } from "src/redux/selectors/app";
import ForgotPassword from "src/tabs/auth/forgot-password/ForgotPassword";
import Login from "src/tabs/auth/Login";
import Register from "src/tabs/auth/register/Register";
import ResetPassword from "src/tabs/auth/reset-password/ResetPassword";
import Dashboard from "src/tabs/dashboard/Dashboard";
import CreateUniversity from "../tabs/universities/CreateUniversity";
import UniversitiesList from "../tabs/universities/list/UniversitiesList";

function SiteAdminRoutes() {
  const navigate = useNavigate();
  const userInfo = useSelector(getCurrentUserInfo);
  console.log("line 16 --------> ", userInfo);
  const userRole = userInfo?.role ?? 3;

  return (
    <Routes>
      {/* <Route element={isLoggedIn ? <Navigate to="/dashboard" /> : <Outlet />}> */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/reset-password/:token?" element={<ResetPassword />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      {/* </Route> */}
      <Route element={<AuthRoute />}>
        <Route
          path="/"
          element={
            !userRole ? (
              <div className="flex justify-center items-center h-full">
                <Spin size="large" />
              </div>
            ) : (
              <Dashboard />
            )
          }
        >
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
        <Route path="/universities" element={<UniversitiesList />} />
        <Route path="/universities/create" element={<CreateUniversity />} />
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

export default SiteAdminRoutes;
