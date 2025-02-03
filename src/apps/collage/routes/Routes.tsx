import { Spin } from "antd";
import { useSelector } from "react-redux";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { AuthRoute } from "src/App";
import Settings from "src/apps/admin/settings/Settings";
import { getCurrentUserInfo } from "src/redux/selectors/app";
import ForgotPassword from "src/tabs/auth/forgot-password/ForgotPassword";
import Login from "src/tabs/auth/Login";
import Register from "src/tabs/auth/register/Register";
import ResetPassword from "src/tabs/auth/reset-password/ResetPassword";
import Dashboard from "src/tabs/dashboard/Dashboard";
import CourseStudentsList from "../tabs/enroll-students/course-student-list/CourseStudentsList";
import EnrolledStudentsList from "../tabs/enroll-students/enrolled-student-list/EnrolledStudentsList";
import EnrollStudentsList from "../tabs/enroll-students/EnrollStudents";
import ExamsList from "../tabs/exams/list/ExamsList";
import CreateStaff from "../tabs/staff/CreateStaff";
import StaffList from "../tabs/staff/list/StaffList";
import CreateStudent from "../tabs/students/CreateStudent";
import StudentsList from "../tabs/students/list/StudentsList";

function CollageRoutes() {
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
        <Route path="/staff" element={<StaffList />} />
        <Route path="/staff/create/:staffId?" element={<CreateStaff />} />

        <Route path="/students" element={<StudentsList />} />
        <Route
          path="/students/create/:studentId?"
          element={<CreateStudent />}
        />

        <Route path="/exams" element={<ExamsList />} />

        <Route
          path="/exams/:examId/:courseId/enroll-students"
          element={<EnrollStudentsList />}
        >
          <Route index element={<Navigate to={"enrolled"} />} />
          <Route path="enrolled" element={<EnrolledStudentsList />} />
          <Route path="all" element={<CourseStudentsList />} />
        </Route>

        <Route path="/settings" element={<Settings />} />
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

export default CollageRoutes;
