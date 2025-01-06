import { Spin } from "antd";
import { useSelector } from "react-redux";
import { Route, Routes, useNavigate } from "react-router-dom";
import { AuthRoute } from "src/App";
import Settings from "src/apps/admin/settings/Settings";
import { getCurrentUserInfo } from "src/redux/selectors/app";
import ForgotPassword from "src/tabs/auth/forgot-password/ForgotPassword";
import Login from "src/tabs/auth/Login";
import Register from "src/tabs/auth/register/Register";
import ResetPassword from "src/tabs/auth/reset-password/ResetPassword";
import Dashboard from "src/tabs/dashboard/Dashboard";
import CreatePlan from "../tabs/plans/create/CreatePlan";
import PlansList from "../tabs/plans/list/PlansList";
import CreateRole from "../tabs/roles/create/CreateRole";
import RolesList from "../tabs/roles/list/RolesList";
import CreateUser from "../tabs/users/create/CreateUser";
import UsersList from "../tabs/users/list/UsersList";

function SuperAdminRoutes() {
  const navigate = useNavigate();
  const userInfo = useSelector(getCurrentUserInfo);
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
        <Route path="/settings" element={<Settings />} />

        <Route path="/users" element={<UsersList />} />
        <Route path="/users/create/:userId?" element={<CreateUser />} />
        <Route
          path="/users/view/:userId?"
          element={<CreateUser isInViewMode={true} />}
        />

        {/* Plans route */}
        <Route path="/plans" element={<PlansList />} />
        <Route path="/plans/create/:planId?" element={<CreatePlan />} />
        <Route
          path="/plans/view/:planId?"
          element={<CreatePlan isInViewMode={true} />}
        />

        {/* Roles route */}
        <Route path="/roles" element={<RolesList />} />
        <Route
          path="/roles/create/:roleId?"
          element={<CreateRole onSuccess={() => navigate("/roles")} />}
        />
        <Route
          path="/roles/view/:roleId?"
          element={<CreateRole isInViewMode={true} />}
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

export default SuperAdminRoutes;
