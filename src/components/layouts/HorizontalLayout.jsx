import { Dialog, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Fragment, useState } from "react";
import { NotificationIcon } from "src/icons/NotificationIcon";
import ProfileV2 from "./ProfileV2";
import Sidebar from "./Sidebar";

export default function HorizontalLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <div>
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-50 lg:hidden"
            onClose={setSidebarOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-900/80" />
            </Transition.Child>

            <div className="fixed inset-0 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                      <button
                        type="button"
                        className="-m-2.5 p-2.5"
                        onClick={() => setSidebarOpen(false)}
                      >
                        <span className="sr-only">Close sidebar</span>
                        <XMarkIcon
                          className="h-6 w-6 text-white"
                          aria-hidden="true"
                        />
                      </button>
                    </div>
                  </Transition.Child>
                  {/* Sidebar component, swap this element with another sidebar if you like */}

                  <Sidebar />
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        {/* Static sidebar for desktop */}
        <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-320px lg:flex-col">
          {/* <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-320px lg:flex-col"> */}
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <Sidebar />
        </div>

        <div className="lg:pl-[320px]">
          <div className="sticky top-0 z-40 lg:mx-auto lg:px-8 h-[94px] flex w-full items-center bg-white">
            <div className="flex h-17 items-center gap-x-4 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-0 lg:shadow-none w-full">
              <button
                type="button"
                className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
                onClick={() => setSidebarOpen(true)}
              >
                <span className="sr-only">Open sidebar</span>
                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
              </button>

              <div className=" self-stretch lg:gap-x-6 w-full  items-center">
                {/* <SearchText /> */}

                <div className=" items-center gap-x-4 lg:gap-x-8">
                  {/* Profile dropdown */}
                  <ProfileV2 />
                </div>
              </div>
            </div>
          </div>

          <main
            className="py-[32px] bg-white-ghost h-full"
            style={{ minHeight: "calc(100vh - 94px)" }}
          >
            <div className="px-4 sm:px-6 lg:px-8 min-h-full">{children}</div>
          </main>
        </div>
      </div>
    </>
  );
}

const NotificationButton = ({ count = 0 }) => {
  return (
    <div className="flex justify-center items-center bg-lavenderBlush h-40px w-40px rounded-md relative shrink-0">
      <div className="flex justify-center items-center h-[14px] w-[14px] text-[8px] text-white font-bold bg-red-radical rounded-full absolute top-[-6px] right-[-6px] shrink-0">
        {count}
      </div>
      <NotificationIcon color="#F93C65" />
    </div>
  );
};
