import {
  AcademicCapIcon,
  AdjustmentsVerticalIcon,
  BookOpenIcon,
  BuildingLibraryIcon,
  CalendarDaysIcon,
  ChartPieIcon,
  Cog6ToothIcon,
  DocumentTextIcon,
  HomeIcon,
  NewspaperIcon,
  UserGroupIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";
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
  EXAMINER: "EXAMINER",
  ANSWER_SHEETS: "ANSWER_SHEETS",
};

export const siteAdminNavOptions = [
  {
    label: "Dashboard",
    name: TAB_NAMES.DASHBOARD,
    href: "/",
    icon: ChartPieIcon,
  },
  {
    label: "University",
    name: TAB_NAMES.UNIVERSITY,
    href: "/universities",
    icon: UserIcon,
  },
  {
    label: "Settings",
    name: TAB_NAMES.SETTINGS,
    href: "/settings",
    icon: Cog6ToothIcon,
  },
];

export const universityNavOptions = [
  {
    label: "Dashboard",
    name: TAB_NAMES.DASHBOARD,
    href: "/",
    icon: ChartPieIcon,
  },
  {
    label: "Collages",
    name: TAB_NAMES.COLLAGES,
    href: "/collages",
    icon: BuildingLibraryIcon,
  },
  {
    label: "Academic Years",
    name: TAB_NAMES.ACADEMIC_YEAR,
    href: "/academic-years",
    icon: CalendarDaysIcon,
  },
  {
    label: "Courses",
    name: TAB_NAMES.COURSES,
    href: "/courses",
    icon: AcademicCapIcon,
  },
  {
    label: "Subjects",
    name: TAB_NAMES.SUBJECT,
    href: "/subjects",
    icon: BookOpenIcon,
  },
  {
    label: "Exams",
    name: TAB_NAMES.EXAM,
    href: "/exams",
    icon: DocumentTextIcon,
  },
  {
    label: "Examiners",
    name: TAB_NAMES.EXAMINER,
    href: "/examiners",
    icon: NewspaperIcon,
  },
  {
    label: "Staff",
    name: TAB_NAMES.STAFF,
    href: "/staff",
    icon: UsersIcon,
  },
  {
    label: "Roles",
    name: TAB_NAMES.ROLES,
    href: "/roles",
    icon: AdjustmentsVerticalIcon,
  },
  {
    label: "Settings",
    name: TAB_NAMES.SETTINGS,
    href: "/settings",
    icon: Cog6ToothIcon,
  },
];

export const collageNavOptions = [
  {
    label: "Dashboard",
    name: TAB_NAMES.DASHBOARD,
    href: "/",
    icon: ChartPieIcon,
  },
  // {
  //   label: "Staff",
  //   name: TAB_NAMES.STAFF,
  //   href: "/staff",
  //   icon: UsersIcon,
  // },
  {
    label: "Student",
    name: TAB_NAMES.STUDENT,
    href: "/students",
    icon: UserGroupIcon,
  },
  {
    label: "Exams",
    name: TAB_NAMES.EXAM,
    href: "/exams",
    icon: AcademicCapIcon,
  },
  {
    label: "Settings",
    name: TAB_NAMES.SETTINGS,
    href: "/settings",
    icon: Cog6ToothIcon,
  },
];

export const examinerNavOptions = [
  {
    label: "Dashboard",
    name: TAB_NAMES.DASHBOARD,
    href: "/",
    icon: ChartPieIcon,
  },
  {
    label: "Answer Sheets",
    name: TAB_NAMES.ANSWER_SHEETS,
    href: "/answer-sheets",
    icon: UserIcon,
  },
  {
    label: "Settings",
    name: TAB_NAMES.SETTINGS,
    href: "/settings",
    icon: Cog6ToothIcon,
  },
];

export const superAdminNavOptions = [
  {
    label: "Dashboard",
    name: TAB_NAMES.DASHBOARD,
    href: "/",
    icon: ChartPieIcon,
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
    icon: ChartPieIcon,
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
