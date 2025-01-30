import { Spin } from "antd";
import { useSelector } from "react-redux";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { AuthRoute } from "src/App";
import { TAB_NAMES } from "src/apps/common/menu-navigation/menuNavigation";
import { checkViewAccess, getCurrentUserInfo } from "src/redux/selectors/app";
import ForgotPassword from "src/tabs/auth/forgot-password/ForgotPassword";
import Login from "src/tabs/auth/Login";
import Register from "src/tabs/auth/register/Register";
import ResetPassword from "src/tabs/auth/reset-password/ResetPassword";
import Dashboard from "src/tabs/dashboard/Dashboard";
import CreateAcademicYear from "../tabs/academic-years/CreateAcademicYear";
import AcademicYearsList from "../tabs/academic-years/list/AcademicYearsList";
import AssignedSubjectsList from "../tabs/assigned-subjects/list/AssignedSubjectsList";
import CreateCollage from "../tabs/collages/CreateCollage";
import CollageList from "../tabs/collages/list/CollageList";
import CreateCourses from "../tabs/courses/CreateCourses";
import CoursesList from "../tabs/courses/list/CoursesList";
import EnrolledStudentsList from "../tabs/enrollments/EnrolledStudentsList";
import ExamCentersList from "../tabs/exam-centers/list/ExamCentersList";
import CreateExamSheets from "../tabs/exam-sheets/CreateExamSheets";
import ExamSheetsList from "../tabs/exam-sheets/list/ExamSheetsList";
import CreateExaminer from "../tabs/examiners/CreateExaminer";
import ExaminersList from "../tabs/examiners/list/ExaminersList";
import CreateExam from "../tabs/exams/CreateExam";
import ExamDetailScreen from "../tabs/exams/ExamDetailScreen";
import ExamsList from "../tabs/exams/list/ExamsList";
import CreateQuestionPaper from "../tabs/question-papers/CreateQuestionPaper";
import CreateRole from "../tabs/roles/create/CreateRole";
import RolesList from "../tabs/roles/list/RolesList";
import CreateStaff from "../tabs/staff/CreateStaff";
import StaffList from "../tabs/staff/list/StaffList";
import StudentResult from "../tabs/student-results/list/StudentResult";
import CreateSubject from "../tabs/subjects/CreateSubject";
import SubjectsList from "../tabs/subjects/list/SubjectsList";

function UniversityRoutes() {
  const navigate = useNavigate();
  const userInfo = useSelector(getCurrentUserInfo);
  console.log("line 16 --------> ", userInfo);
  const userRole = userInfo?.role ?? 3;

  const hasViewAccessToTab = useSelector((state) => checkViewAccess(state));

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

        {hasViewAccessToTab(TAB_NAMES.COLLAGES) && (
          <>
            <Route path="/collages" element={<CollageList />} />
            <Route
              path="/collages/create/:collageId?"
              element={<CreateCollage />}
            />
          </>
        )}

        {hasViewAccessToTab(TAB_NAMES.ACADEMIC_YEAR) && (
          <>
            <Route path="/academic-years" element={<AcademicYearsList />} />
            <Route
              path="/academic-years/create/:yearId?"
              element={<CreateAcademicYear />}
            />
          </>
        )}

        {hasViewAccessToTab(TAB_NAMES.COURSES) && (
          <>
            <Route path="/courses" element={<CoursesList />} />
            <Route
              path="/courses/create/:courseId?"
              element={<CreateCourses />}
            />
          </>
        )}

        {hasViewAccessToTab(TAB_NAMES.SUBJECT) && (
          <>
            <Route path="/subjects" element={<SubjectsList />} />
            <Route
              path="/subjects/create/:subjectId?"
              element={<CreateSubject />}
            />
          </>
        )}

        {hasViewAccessToTab(TAB_NAMES.EXAM) && (
          <>
            <Route path="/exams" element={<ExamsList />} />
            <Route path="/exams/create" element={<CreateExam />} />
            <Route path="/exams/:examId" element={<ExamDetailScreen />}>
              <Route index element={<Navigate to={"subjects"} />} />
              <Route path="subjects" element={<AssignedSubjectsList />} />
              <Route
                path="subjects/:subjectId/questions"
                element={<CreateQuestionPaper />}
              />

              <Route path="enrollments" element={<EnrolledStudentsList />} />
              <Route path="centers" element={<ExamCentersList />} />
              <Route path="exam-sheets" element={<ExamSheetsList />} />
              <Route path="exam-sheets/create" element={<CreateExamSheets />} />
            </Route>
            <Route
              path="/exams/:examId/:studentId/result"
              element={<StudentResult />}
            />
          </>
        )}

        {hasViewAccessToTab(TAB_NAMES.EXAMINER) && (
          <>
            <Route path="/examiners" element={<ExaminersList />} />
            <Route
              path="/examiners/create/:examinerId?"
              element={<CreateExaminer />}
            />
          </>
        )}

        {hasViewAccessToTab(TAB_NAMES.STAFF) && (
          <>
            <Route path="/staff" element={<StaffList />} />
            <Route path="/staff/create/:staffId?" element={<CreateStaff />} />
          </>
        )}

        {userRole === 2 && (
          <>
            <Route path="/roles" element={<RolesList />} />
            <Route path="/roles/create/:roleId?" element={<CreateRole />} />
          </>
        )}
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
