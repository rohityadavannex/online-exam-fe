import moment from "moment";
import {
  BREADCRUMBS,
  BUSINESS_TYPE,
  GENDERS,
  IDENTITY_DOCUMENTS_OPTIONS,
  LEAD_STATUS_OPTIONS,
  LEAD_TYPE,
  PAYMENT_METHOD_OPTIONS,
} from "src/utils/constants";
import { v4 as uuidv4 } from "uuid";
import cities from "../utils/cities.json";
import countries from "../utils/countries.json";
import states from "../utils/states.json";

export const generateRandomId = () => uuidv4();

export const getTokenFromLocalStorage = () => localStorage.getItem("token");

export const setTokenInLocalStorage = (token: string) =>
  localStorage.setItem("token", token);

export const logout = () => localStorage.clear();

export const formatNumber = (val: number): string => {
  return new Intl.NumberFormat("en-IN").format(val);
};

export const getFormattedDate = (val: string) => {
  return moment(val).format("DD MMM YYYY");
};

export const getFormattedTime = (time: string) => {
  return moment(time, "HH:mm:ss").format("hh:mm A");
};

export const getCountryLabel = (countryCode: string) => {
  return (
    countries.find((country) => country.value === countryCode)?.label ?? "-"
  );
};

export const getStateLabel = (stateCode: string) => {
  return states.find((state) => state.value === stateCode)?.label ?? "-";
};

export const getCityLabel = (cityCode: string) => {
  return cities.find((city) => city.value === cityCode)?.label ?? "-";
};

export const getPaymentMethodLabel = (value: number) => {
  return (
    PAYMENT_METHOD_OPTIONS.find((method) => method.value === value)?.label ??
    "-"
  );
};

export const getQueryData = (
  data: Record<string, number | string | undefined>
) => {
  let queryString = "";

  if (Object.keys(data).length === 0) {
    return queryString;
  }

  queryString = "?";

  Object.keys(data).forEach((item, index, arr) => {
    const isLast = index === arr.length - 1;
    queryString += `${item}=${data[item]}${!isLast ? "&" : ""}`;
  });

  return queryString;
};

export const handleCsvExport = (data: Record<string, string | number>[]) => {
  // Convert data to CSV format
  const csvRows = [];
  const headers = Object.keys(data[0]);
  csvRows.push(headers.join(",")); // Add headers

  for (const row of data) {
    const values = headers.map((header) => {
      const escaped = ("" + row[header]).replace(/"/g, '""'); // Escape double quotes
      return `"${escaped}"`; // Wrap in quotes
    });
    csvRows.push(values.join(",")); // Add row
  }

  const csvString = csvRows.join("\n"); // Join rows with newline

  // Create a blob and trigger download
  const blob = new Blob([csvString], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);
  link.setAttribute("href", url);
  link.setAttribute("download", "schools.csv");
  link.style.visibility = "hidden";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const getGenderLabel = (value: number) => {
  return GENDERS.find((gender) => gender.value === value)?.label;
};

export function formatFileSize(size: number) {
  if (size < 1024) {
    return size + " bytes";
  } else if (size < 1024 * 1024) {
    return (size / 1024).toFixed(2) + " KB";
  } else {
    return (size / (1024 * 1024)).toFixed(2) + " MB";
  }
}

export function getIdentityTypeLabel(type: number) {
  return (
    IDENTITY_DOCUMENTS_OPTIONS.find((item) => item.value === type)?.label ??
    undefined
  );
}

export function getLeadType(value: number) {
  return LEAD_TYPE.find((lt) => value === lt.value)?.label ?? undefined;
}

export function getStatus(value: number) {
  return LEAD_STATUS_OPTIONS.find((ls) => value === ls.value)?.label ?? "-";
}

export function getBreadcrumb(type: string) {
  return BREADCRUMBS[type];
}

export function getBusinessTypeLabel(value: number) {
  return BUSINESS_TYPE.find((bt) => value === bt.value)?.label ?? "-";
}

export function randomIntFromInterval(min: number, max: number) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function getImageUrl(image: string) {
  return `${process.env.REACT_APP_API_URL}/uploads/${image}`;
}

export function mappedCSVData(
  data: { clientGender?: number | null; gender?: number | null }[]
) {
  return data.map((item) => ({
    ...item,
    ...(item?.clientGender && {
      clientGender: item.clientGender ? getGenderLabel(item.clientGender) : "",
    }),
    ...(item?.gender && {
      gender: item.gender ? getGenderLabel(item.gender) : "",
    }),
  }));
}
