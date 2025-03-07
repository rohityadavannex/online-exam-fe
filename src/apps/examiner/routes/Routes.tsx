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
import AnswerSheets from "../tabs/answer-sheets/list/AnswerSheets";
import CheckAnswerSheet from "../tabs/check-answer-sheet/CheckAnswerSheet";

function ExaminerRoutes() {
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
        <Route path="/answer-sheets" element={<AnswerSheets />} />
        <Route
          path="/answer-sheets/check/:subjectId/:sheetId"
          element={<CheckAnswerSheet />}
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

export default ExaminerRoutes;
