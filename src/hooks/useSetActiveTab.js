import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getActiveTab } from "src/redux/selectors/app";
import { setActiveTab } from "../redux/actions/app";

const useSetActiveTab = (tabName) => {
  const dispatch = useDispatch();
  const activeTab = useSelector(getActiveTab);

  useEffect(() => {
    dispatch(setActiveTab(tabName ? tabName : activeTab));
  }, [activeTab, dispatch, tabName]);
};

export default useSetActiveTab;
