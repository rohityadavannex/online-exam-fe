import { HomeIcon } from "@heroicons/react/24/outline";
import { DashboardIcon } from "src/icons";
import { PlansIcon } from "src/icons/PlansIcon";
import { RolesIcon } from "src/icons/RolesIcon";
import { SettingsIcon } from "src/icons/SettingsIcon";
import { UserIcon } from "src/icons/UserIcon";

export const TAB_NAMES = {
  DASHBOARD: "DASHBOARD",
  USERS: "USERS",
  ROLES: "ROLES",
  SETTINGS: "SETTINGS",
  EDIT_PROFILE_SETTINGS: "EDIT_PROFILE_SETTINGS",
  MODULES: "MODULES",
  PEOPLE: "PEOPLE",
  PLANS: "PLANS",
  INSTITUTE: "INSTITUTE",
  SECTION: "SECTION",
  SUBJECT: "SUBJECT",
  SYLLABUS: "SYLLABUS",
  ASSIGNMENT: "ASSIGNMENT",
  DESIGNATION: "DESIGNATION",
  DEPARTMENT: "DEPARTMENT",
  CATEGORY: "CATEGORY",
  ACADEMIC_YEAR: "ACADEMIC_YEAR",
  STAFF: "STAFF",
  STUDENT: "STUDENT",
  UNIVERSITY: "UNIVERSITY",
  COLLAGES: "COLLAGES",
  COURSES: "COURSES",
  EXAM: "EXAM",
};

export const siteAdminNavOptions = [
  {
    label: "Dashboard",
    name: TAB_NAMES.DASHBOARD,
    href: "/",
    icon: DashboardIcon,
  },
  {
    label: "University",
    name: TAB_NAMES.UNIVERSITY,
    href: "/universities",
    icon: UserIcon,
  },
];

export const universityNavOptions = [
  {
    label: "Dashboard",
    name: TAB_NAMES.DASHBOARD,
    href: "/",
    icon: DashboardIcon,
  },
  {
    label: "Collages",
    name: TAB_NAMES.COLLAGES,
    href: "/collages",
    icon: UserIcon,
  },
  {
    label: "Academic Years",
    name: TAB_NAMES.ACADEMIC_YEAR,
    href: "/academic-years",
    icon: UserIcon,
  },
  {
    label: "Courses",
    name: TAB_NAMES.COURSES,
    href: "/courses",
    icon: UserIcon,
  },
  {
    label: "Exams",
    name: TAB_NAMES.EXAM,
    href: "/exams",
    icon: UserIcon,
  },
];

export const collageNavOptions = [
  {
    label: "Dashboard",
    name: TAB_NAMES.DASHBOARD,
    href: "/",
    icon: DashboardIcon,
  },
  {
    label: "Staff",
    name: TAB_NAMES.STAFF,
    href: "/staff",
    icon: UserIcon,
  },
  {
    label: "Student",
    name: TAB_NAMES.STUDENT,
    href: "/students",
    icon: UserIcon,
  },
];

export const superAdminNavOptions = [
  {
    label: "Dashboard",
    name: TAB_NAMES.DASHBOARD,
    href: "/",
    icon: DashboardIcon,
  },
  {
    label: "Users",
    name: TAB_NAMES.USERS,
    href: "/users",
    icon: UserIcon,
  },
  {
    label: "Plans",
    name: TAB_NAMES.PLANS,
    href: "/plans",
    icon: PlansIcon,
  },
  {
    label: "Roles",
    name: TAB_NAMES.ROLES,
    href: "/roles",
    icon: RolesIcon,
  },
];

export const subAdminNavOptions = [
  {
    label: "Sub-Admin Dashboard",
    name: TAB_NAMES.DASHBOARD,
    href: "/",
    icon: HomeIcon,
  },
];

export const adminNavOptions = [
  {
    label: "Dashboard",
    name: TAB_NAMES.DASHBOARD,
    href: "/dashboard",
    icon: DashboardIcon,
  },

  {
    label: "Roles",
    name: TAB_NAMES.ROLES,
    href: "/roles",
    icon: RolesIcon,
  },
  {
    label: "Institute",
    name: TAB_NAMES.INSTITUTE,
    href: "/institute",
    icon: RolesIcon,
  },
  {
    label: "Section",
    name: TAB_NAMES.SECTION,
    href: "/sections",
    icon: RolesIcon,
  },
  {
    label: "Subject",
    name: TAB_NAMES.SUBJECT,
    href: "/subjects",
    icon: RolesIcon,
  },
  {
    label: "Syllabus",
    name: TAB_NAMES.SYLLABUS,
    href: "/syllabus",
    icon: RolesIcon,
  },
  {
    label: "Assignment",
    name: TAB_NAMES.ASSIGNMENT,
    href: "/assignments",
    icon: RolesIcon,
  },
  {
    label: "Designation",
    name: TAB_NAMES.DESIGNATION,
    href: "/designation",
    icon: RolesIcon,
  },
  {
    label: "Department",
    name: TAB_NAMES.DEPARTMENT,
    href: "/departments",
    icon: RolesIcon,
  },
  {
    label: "Category",
    name: TAB_NAMES.CATEGORY,
    href: "/categories",
    icon: RolesIcon,
  },
  {
    label: "Academic Year",
    name: TAB_NAMES.ACADEMIC_YEAR,
    href: "/academic-years",
    icon: RolesIcon,
  },
  {
    label: "Staff",
    name: TAB_NAMES.STAFF,
    href: "/staff",
    icon: RolesIcon,
  },
  {
    label: "Students",
    name: TAB_NAMES.STUDENT,
    href: "/students",
    icon: RolesIcon,
  },
  {
    label: "Settings",
    name: TAB_NAMES.SETTINGS,
    icon: SettingsIcon,
    children: [
      {
        label: "Profile",
        name: TAB_NAMES.EDIT_PROFILE_SETTINGS,
        href: "/profile/edit",
        icon: UserIcon,
      },
    ],
  },
];

export const getAdminNavTabs = (hasViewAccessToTab: any) => {
  return adminNavOptions.filter((tab) => {
    return (
      // set default access to profile page
      [TAB_NAMES.EDIT_PROFILE_SETTINGS].includes(tab.name) ||
      hasViewAccessToTab(tab.name) ||
      tab?.children?.some((child) => hasViewAccessToTab(child.name))
    );
  });
};
