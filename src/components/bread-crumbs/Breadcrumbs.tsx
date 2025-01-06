import classNames from "classnames";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Fragment } from "react/jsx-runtime";
import { getBreadcrumb } from "src/helpers/helpers";
import { RightArrowIcon } from "src/icons/RightArrowIcon";
import { getActiveTab } from "src/redux/selectors/app";

const Breadcrumbs = () => {
  const activeTab = useSelector(getActiveTab);
  const breadcrumb = getBreadcrumb(activeTab);
  const lastIndex = breadcrumb?.length - 1;

  return (
    <>
      <nav className="box-border m-0 p-0">
        <ol className="flex items-center flex-wrap m-0 p-0 list-none">
          {breadcrumb?.map(({ link, label }, i) => (
            <Fragment key={link + i}>
              <li
                className={classNames(
                  "transition-[color] duration-[0.2s] leading-[22px] rounded h-[22px] inline-block px-1 py-0 text-blue-dark font-[300] text-[14px]",
                  {
                    "cursor-default": lastIndex === i,
                    "hover:bg-[rgba(0,0,0,0.06)]": lastIndex !== i,
                  }
                )}
              >
                {lastIndex === i ? (
                  <span>{label}</span>
                ) : (
                  <span>
                    <Link to={link}>{label}</Link>
                  </span>
                )}
              </li>
              {lastIndex !== i && (
                <li className="forward-slash mx-1.5" aria-hidden={true}>
                  <RightArrowIcon color="#16151C" />
                </li>
              )}
            </Fragment>
          ))}
        </ol>
      </nav>
    </>
  );
};

export default Breadcrumbs;
