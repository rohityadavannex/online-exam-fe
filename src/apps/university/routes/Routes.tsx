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
import CreateAcademicYear from "../tabs/academic-years/CreateAcademicYear";
import AcademicYearsList from "../tabs/academic-years/list/AcademicYearsList";
import CreateCollage from "../tabs/collages/CreateCollage";
import CollageList from "../tabs/collages/list/CollageList";
import CreateCourses from "../tabs/courses/CreateCourses";
import CoursesList from "../tabs/courses/list/CoursesList";

function UniversityRoutes() {
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
        <Route path="/collages" element={<CollageList />} />
        <Route
          path="/collages/create/:collageId?"
          element={<CreateCollage />}
        />

        <Route path="/academic-years" element={<AcademicYearsList />} />
        <Route
          path="/academic-years/create/:yearId?"
          element={<CreateAcademicYear />}
        />

        <Route path="/courses" element={<CoursesList />} />
        <Route path="/courses/create/:courseId?" element={<CreateCourses />} />
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

export default UniversityRoutes;
