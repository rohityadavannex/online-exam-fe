import { ConfigProvider, Spin } from "antd";
import { Suspense, useEffect } from "react";
import "react-loading-skeleton/dist/skeleton.css";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "tippy.js/dist/tippy.css";
import "./App.css";
import CollageRoutes from "./apps/collage/routes/Routes";
import ExaminerRoutes from "./apps/examiner/routes/Routes";
import SiteAdminRoutes from "./apps/site-admin/routes/Routes";
import UniversityRoutes from "./apps/university/routes/Routes";
import HorizontalLayout from "./components/layouts/HorizontalLayout";
import { getTokenFromLocalStorage } from "./helpers/helpers";
import { initialize } from "./redux/actions/app";
import { getCurrentUserInfo, isAppInitializing } from "./redux/selectors/app";
import { ROLES } from "./utils/constants";

function App() {
  const dispatch = useDispatch();
  const isLoggedIn = !!getTokenFromLocalStorage();

  const userInfo = useSelector(getCurrentUserInfo);
  const userRole = userInfo?.role ?? 3;

  const isInitializing = useSelector(isAppInitializing);

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(initialize());
    }
  }, [dispatch, isLoggedIn]);

  if (isInitializing) {
    return (
      <div className="flex justify-center items-center h-full">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#5900d9", // Set your desired primary color here
          },
        }}
      >
        <ToastContainer />
        <Suspense
          fallback={
            <div className="flex justify-center items-center h-full">
              <Spin size="large" />
            </div>
          }
        >
          {getRoutes(userRole)}
        </Suspense>
      </ConfigProvider>
    </>
  );
}

export default App;

export const AuthRoute = ({ isInLayout = true }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!getTokenFromLocalStorage()) {
      navigate("/login");
      return;
    }
  }, [navigate]);

  if (!isInLayout) {
    return <Outlet />;
  }

  return (
    <HorizontalLayout>
      <Outlet />
    </HorizontalLayout>
  );
};

function getRoutes(role) {
  console.log("line 92 ", role, ROLES.EXAMINER);
  if (role === ROLES.SITE_ADMIN) {
    return <SiteAdminRoutes />;
  }
  // if (role === ROLES.UNIVERSITY) {
  //   return <UniversityRoutes />;
  // }
  if (role === ROLES.COLLEGE) {
    return <CollageRoutes />;
  }
  if (role === ROLES.EXAMINER) {
    return <ExaminerRoutes />;
  }
  return <UniversityRoutes />;
}
