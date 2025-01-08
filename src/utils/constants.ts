import { TAB_NAMES } from "src/apps/common/menu-navigation/menuNavigation";

export enum GENDER_ENUM {
  MALE = 1,
  FEMALE = 2,
  OTHERS = 3,
}

export const GENDERS = [
  {
    label: "Male",
    value: GENDER_ENUM.MALE,
  },
  {
    label: "Female",
    value: GENDER_ENUM.FEMALE,
  },
  {
    label: "Others",
    value: GENDER_ENUM.OTHERS,
  },
];

export const COURSE_OPTIONS = [
  {
    label: "B.SC",
    value: 1,
  },
  {
    label: "B.Tech",
    value: 2,
  },
  {
    label: "B.A.",
    value: 3,
  },
];

export const IDENTITY_DOCUMENTS_OPTIONS = [
  {
    label: "Aadhar Card",
    value: 1,
  },
  {
    label: "Pan Card",
    value: 2,
  },
];

export const QUERY_SOURCES = [
  {
    label: "Email",
    value: 1,
  },
  {
    label: "Instagram",
    value: 2,
  },
  {
    label: "Facebook",
    value: 3,
  },
];

export const LEAD_TYPE = [
  {
    label: "New",
    value: 1,
  },
  {
    label: "Old",
    value: 2,
  },
  {
    label: "Repeat",
    value: 3,
  },
];

export const RATING_OPTIONS = [
  {
    label: "1",
    value: 1,
  },
  {
    label: "2",
    value: 2,
  },
  {
    label: "3",
    value: 3,
  },
  {
    label: "4",
    value: 4,
  },
  {
    label: "5",
    value: 5,
  },
];

export const PAYMENT_METHOD_OPTIONS = [
  {
    label: "Cash",
    value: 1,
  },
  {
    label: "Credit Card",
    value: 2,
  },
  {
    label: "UPI",
    value: 3,
  },
];

export const BREADCRUMBS = {
  [TAB_NAMES.ROLES]: [
    { label: "Roles", link: "/roles" },
    { label: "Add Role", link: "/roles/create" },
  ],
};

export const BUSINESS_TYPE = [
  {
    label: "Sales",
    value: 1,
  },
];

export const UNIT = [
  {
    label: "KG",
    value: 1,
  },
  {
    label: "L",
    value: 2,
  },
  {
    label: "Unit",
    value: 3,
  },
];

export const CATEGORY = [
  {
    label: "Drinks",
    value: 1,
  },
  {
    label: "Food",
    value: 2,
  },
  {
    label: "Snacks",
    value: 3,
  },
];

export enum PR_STATUS {
  PENDING = 1,
  PROCESSING = 2,
  APPROVED = 3,
  REJECTED = 4,
  FULL_FILLED = 5,
  DECLINED = 6,
  COMPLETED = 7,
  IN_COMPLETED = 8,
}

export const PURCHASE_ORDER_STATUS = [
  {
    label: "Full Filled",
    value: PR_STATUS.FULL_FILLED,
  },
  {
    label: "Rejected",
    value: PR_STATUS.REJECTED,
  },
];

export const PROCUREMENT_REQUEST_STATUS = [
  {
    label: "Pending",
    value: PR_STATUS.PENDING,
  },
  {
    label: "Processing",
    value: PR_STATUS.PROCESSING,
  },
  {
    label: "Approved",
    value: PR_STATUS.APPROVED,
  },

  ...PURCHASE_ORDER_STATUS,
  {
    label: "Completed",
    value: PR_STATUS.COMPLETED,
  },
  {
    label: "In Completed",
    value: PR_STATUS.IN_COMPLETED,
  },
];

export enum INVENTORY_STATUS {
  PENDING = 1,
  APPROVED = 2,
  DECLINED = 3,
}

export const INVENTORY_STATUS_LABEL = [
  {
    label: "PENDING",
    value: INVENTORY_STATUS.PENDING,
  },
  {
    label: "APPROVED",
    value: INVENTORY_STATUS.APPROVED,
  },
  {
    label: "DECLINED",
    value: INVENTORY_STATUS.DECLINED,
  },
];

export enum APPOINTMENT_TYPES {
  SERVICE = 1,
  PACKAGE = 2,
  COURSE = 3,
}
export const LANGUAGES = [
  {
    label: "English",
    value: 1,
  },
  {
    label: "French",
    value: 2,
  },
];

export const FONT_FAMILIES = [
  {
    label: "Roboto",
    value: 1,
  },
  {
    label: "Arial",
    value: 2,
  },
];

export enum ROLES {
  SUPER_ADMIN = 1,
  ADMIN = 2,
}

export const ROLE_PERMISSION_FEATURES: { label: string; value: string }[] = [
  {
    label: "Dashboard",
    value: TAB_NAMES.DASHBOARD,
  },

  {
    label: "Roles",
    value: TAB_NAMES.ROLES,
  },

  {
    label: "Users",
    value: TAB_NAMES.USERS,
  },
  {
    label: "Plans",
    value: TAB_NAMES.PLANS,
  },
];

export const PLANS_FEATURES: { label: string; value: string }[] = [
  { label: "Dashboard", value: TAB_NAMES.DASHBOARD },

  { label: "Roles", value: TAB_NAMES.ROLES },

  { label: "Users", value: TAB_NAMES.USERS },
  { label: "Plans", value: TAB_NAMES.PLANS },
];

export enum ADDRESS {
  COUNTRY = "country",
  STATE = "state",
  CITY = "city",
}

const PENDING = "Pending";
const IN_PROGRESS = "In Progress";
const COMPLETED = "Completed";
const AVAILABLE = "Available";
const OUT_OF_STOCK = "Out of Stock";

export enum INVENTORY_REQUEST_STATUS {
  REQUESTED = 1,
  COMPLETED = 2,
  IN_COMPLETED = 3,
}

export const INVENTORY_REQUEST_STATUS_CELL = {
  [INVENTORY_REQUEST_STATUS.REQUESTED]: {
    label: "Requested",
    color: "#6226EF",
    bgColor: "#6226EF20",
  },
  [INVENTORY_REQUEST_STATUS.COMPLETED]: {
    label: COMPLETED,
    color: "#00b69b",
    bgColor: "#00B69B33",
  },
  [INVENTORY_REQUEST_STATUS.IN_COMPLETED]: {
    label: "In Completed",
    color: "#EF3826",
    bgColor: "#EF382620",
  },
};

export const PR_PO_STATUS_CELL = {
  [PR_STATUS.PENDING]: {
    label: PENDING,
    color: "#6226EF",
    bgColor: "#6226EF20",
  },
  [PR_STATUS.PROCESSING]: {
    label: "Processing",
    color: "#FFA756",
    bgColor: "#FFA75620",
  },
  [PR_STATUS.APPROVED]: {
    label: "Approved",
    color: "#00b69b",
    bgColor: "#00B69B33",
  },
  [PR_STATUS.REJECTED]: {
    label: "Rejected",
    color: "#EF3826",
    bgColor: "#EF382620",
  },
  [PR_STATUS.FULL_FILLED]: {
    label: "Full Filled",
    color: "#00b69b",
    bgColor: "#00B69B33",
  },
  [PR_STATUS.DECLINED]: {
    label: "Declined",
    color: "#EF3826",
    bgColor: "#EF382620",
  },
  [PR_STATUS.COMPLETED]: {
    label: COMPLETED,
    color: "#00b69b",
    bgColor: "#00B69B33",
  },
  [PR_STATUS.IN_COMPLETED]: {
    label: "In Completed",
    color: "#EF3826",
    bgColor: "#EF382620",
  },
};

export enum LEAD_STATUS {
  PENDING = 1,
  IN_PROGRESS = 2,
  COMPLETED = 3,
}

export const LEAD_STATUS_OPTIONS = [
  {
    label: PENDING,
    value: LEAD_STATUS.PENDING,
  },
  {
    label: IN_PROGRESS,
    value: LEAD_STATUS.IN_PROGRESS,
  },
  {
    label: COMPLETED,
    value: LEAD_STATUS.COMPLETED,
  },
];

export const LEAD_STATUS_CELL = {
  [LEAD_STATUS.PENDING]: {
    label: PENDING,
    color: "#6226EF",
    bgColor: "#6226EF20",
  },
  [LEAD_STATUS.IN_PROGRESS]: {
    label: IN_PROGRESS,
    color: "#FFA756",
    bgColor: "#FFA75620",
  },
  [LEAD_STATUS.COMPLETED]: {
    label: COMPLETED,
    color: "#00b69b",
    bgColor: "#00B69B33",
  },
};

export enum PRODUCT_STATUS {
  AVAILABLE = 1,
  OUT_OF_STOCK = 2,
}

export const PRODUCT_STATUS_OPTIONS = [
  {
    label: AVAILABLE,
    value: PRODUCT_STATUS.AVAILABLE,
  },
  {
    label: OUT_OF_STOCK,
    value: PRODUCT_STATUS.OUT_OF_STOCK,
  },
];

export const PRODUCT_STATUS_CELL = {
  [PRODUCT_STATUS.AVAILABLE]: {
    label: AVAILABLE,
    color: "#00b69b",
    bgColor: "#00B69B33",
  },
  [PRODUCT_STATUS.OUT_OF_STOCK]: {
    label: OUT_OF_STOCK,
    color: "#EF3826",
    bgColor: "#EF382620",
  },
};

export enum EVENT_STATUS {
  PLANNED = 1,
  CHECKED_IN = 2,
  HELD = 3,
  CANCELLED = 4,
  RESCHEDULED = 5,
}

const PLANNED = "Planned";
const CHECKED_IN = "Checked In";
const HELD = "Held";
const CANCELLED = "Cancelled";
const RESCHEDULED = "Rescheduled";

export const EVENT_STATUS_CELL = {
  [EVENT_STATUS.PLANNED]: {
    label: PLANNED,
    color: "#00B69B",
    bgColor: "#00B69B20",
  },
  [EVENT_STATUS.CHECKED_IN]: {
    label: CHECKED_IN,
    color: "#6226EF",
    bgColor: "#6226EF20",
  },
  [EVENT_STATUS.HELD]: {
    label: HELD,
    color: "#FFA756",
    bgColor: "#FFA75620",
  },
  [EVENT_STATUS.CANCELLED]: {
    label: CANCELLED,
    color: "#EF3826",
    bgColor: "#EF382620",
  },
  [EVENT_STATUS.RESCHEDULED]: {
    label: RESCHEDULED,
    color: "#2B66BE",
    bgColor: "#2B66BE20",
  },
};

export const EVENT_STATUS_OPTIONS = [
  {
    label: PLANNED,
    value: EVENT_STATUS.PLANNED,
  },
  {
    label: CHECKED_IN,
    value: EVENT_STATUS.CHECKED_IN,
  },
  {
    label: HELD,
    value: EVENT_STATUS.HELD,
  },
  {
    label: CANCELLED,
    value: EVENT_STATUS.CANCELLED,
  },
  {
    label: RESCHEDULED,
    value: EVENT_STATUS.RESCHEDULED,
  },
];

export enum VIEW_MODE {
  LIST = 1,
  GRID = 2,
}

export const NATIONALITIES = [
  { label: "Indian", value: 1 },
  { label: "American", value: 2 },
  { label: "Canadian", value: 3 },
  { label: "Australian", value: 4 },
  { label: "British", value: 5 },
  { label: "Chinese", value: 6 },
  { label: "German", value: 7 },
  { label: "French", value: 8 },
  { label: "Japanese", value: 9 },
  { label: "Mexican", value: 10 },
];

export const RELIGIONS = [
  { label: "Hinduism", value: 1 },
  { label: "Christianity", value: 2 },
  { label: "Islam", value: 3 },
  { label: "Buddhism", value: 4 },
  { label: "Sikhism", value: 5 },
  { label: "Judaism", value: 6 },
  { label: "Atheism/Agnostic", value: 7 },
  { label: "Other Religions", value: 8 },
];

export const MEDIUMS = [
  { label: "English", value: 1 },
  { label: "Hindi", value: 2 },
];

export const STAFF_RELATIONS = [
  { label: "Teaching", value: 1 },
  { label: "Non-Teaching", value: 2 },
];

export const YES_NO_OPTIONS = [
  { label: "Yes", value: 1 },
  { label: "No", value: 2 },
];

export const SCHOOLING_TYPE = [
  { label: "Day Scholar", value: 1 },
  { label: "Hosteler", value: 2 },
];

export const BLOOD_GROUPS = [
  { label: "A+", value: 1 },
  { label: "A-", value: 2 },
  { label: "B+", value: 3 },
  { label: "B-", value: 4 },
  { label: "AB+", value: 5 },
  { label: "AB-", value: 6 },
  { label: "O+", value: 7 },
  { label: "O-", value: 8 },
];

export const RELATIONS = [
  { label: "Uncle", value: 1 },
  { label: "Aunt", value: 2 },
  { label: "Grand Father", value: 3 },
  { label: "Grand Mother", value: 4 },
  { label: "Neighbor", value: 5 },
  { label: "Family Friend", value: 6 },
  { label: "Brother", value: 7 },
  { label: "Sister", value: 8 },
  { label: "Father", value: 9 },
  { label: "Mother", value: 10 },
  { label: "Other", value: 11 },
];

export const TRANSPORTS = [
  { label: "Bus", value: 1 },
  { label: "One-way Bus", value: 2 },
  { label: "Private", value: 3 },
];

export const HOUSES = [
  { label: "Yellow", value: 1 },
  { label: "Pink", value: 2 },
  { label: "White", value: 3 },
  { label: "Black", value: 4 },
];

export enum STAFF {
  TEACHER = 4,
}

export const STAFF_OPTIONS = [
  {
    label: "Teacher",
    value: STAFF.TEACHER,
  },
];
