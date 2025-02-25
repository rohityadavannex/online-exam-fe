import classNames from "classnames";
import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "src/helpers/helpers";
import { BellIcon, CommentIcon, QueryIcon, UserIcon2 } from "src/icons";
import { ProfileIcon } from "src/icons/ProfileIcon";
import { getCurrentUserInfo } from "src/redux/selectors/app";
import ContextDropdown from "../dropdowns/ContextDropdown";

const ProfileV2 = () => {
  const currentUserInfo = useSelector(getCurrentUserInfo);
  const userImage = currentUserInfo?.image;

  return (
    <div className="flex gap-[16px] items-center cursor-pointer">
      <div className="w-full ">
        <div className="float-right">
          <div className="flex gap-[35px]">
            {/* <div className="flex gap-[15px] ">
              <img src={Logo} alt="school logo" />
              <span className="text-[14px] font-[600]">
                GOTAN INTERNATIONAL SR. SEC. SCHOOL <br />
                <span className="text-[12px] font-[400]">
                  Account ID:SLRJ2102636
                </span>
              </span>
            </div> */}
            <div className="flex gap-[14px]">
              <div className="p-2 bg-[#EBECEF] h-10 rounded-full">
                <QueryIcon />
              </div>
              <div className="p-2 bg-[#EBECEF] h-10 rounded-full">
                <CommentIcon />
              </div>
              <div className="p-2 bg-[#EBECEF] h-10 rounded-full">
                <BellIcon />
              </div>
              <ContextDropdown content={<ProfileDropdown />} placement="bottom">
                <div>
                  <UserIcon2 />
                </div>
              </ContextDropdown>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileV2;

const ProfileDropdown = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userNavigation = useMemo(
    () => [
      {
        name: "Sign out",
        icon: ProfileIcon,
        onClick: () => {
          logout();
          dispatch({ type: "LOGOUT" });
          setTimeout(() => {
            navigate("/login");
          }, 10);
        },
      },
    ],
    [dispatch, navigate]
  );

  return (
    <div className="flex flex-col py-2 rounded-14px">
      {userNavigation.map(({ name, icon: Icon, onClick }, index) => {
        const isLastElement = index === userNavigation.length - 1;
        return (
          <div
            key={index}
            className={classNames(
              "flex items-center py-[9px] px-[20px] gap-2 cursor-pointer hover:bg-white-ghost text-14px font-semibold",
              { "border-b-[1px]": !isLastElement }
            )}
            onClick={onClick}
          >
            <Icon color="#28303F" />
            {name}
          </div>
        );
      })}
    </div>
  );
};
