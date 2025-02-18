import { ConfigProvider, Spin } from "antd";
import { Suspense, useEffect } from "react";
import "react-loading-skeleton/dist/skeleton.css";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "tippy.js/dist/tippy.css";
import "./App.css";
import SiteAdminRoutes from "./apps/site-admin/routes/Routes";
import SuperAdminRoutes from "./apps/super-admin/routes/Routes";
import UserRoutes from "./apps/user/routes/Routes";
import HorizontalLayout from "./components/layouts/HorizontalLayout";
import { getTokenFromLocalStorage } from "./helpers/helpers";
import { initialize } from "./redux/actions/app";
import { getCurrentUserInfo, isAppInitializing } from "./redux/selectors/app";

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
  if (role === 1) {
    return <SiteAdminRoutes />;
  }
  if (role === 2) {
    return <SuperAdminRoutes />;
  }
  return <UserRoutes />;
}
