import useFetchAsync from "src/hooks/useFetchAsync";
import useSWR from "swr";
import { getTokenFromLocalStorage, logout } from "../helpers/helpers";

const checkIfDataHasFile = (data) => {
  let hasFileType = false;

  for (const item in data) {
    if (data[item] instanceof File) {
      hasFileType = true;
    }
  }

  return hasFileType;
};

const call = async (url, method, data) => {
  let isMultiPartFormData;
  let formData;
  if (checkIfDataHasFile(data)) {
    isMultiPartFormData = true;
    formData = new FormData();
    for (let name in data) {
      formData.append(name, data[name]);
    }
  }

  const res = await fetch(`${process.env.REACT_APP_API_URL}${url}`, {
    method: method,
    headers: {
      ...(!isMultiPartFormData ? { "content-type": "application/json" } : {}),
      Authorization: `Bearer ${getTokenFromLocalStorage()}`,
    },
    ...(data ? { body: formData ?? JSON.stringify(data) } : {}),
  });
  const resData = await res.json();

  if ([401].includes(resData.status)) {
    logout();
    return;
  }

  if (![200, 201].includes(resData.status)) {
    throw new Error("Request failed", {
      cause: { status: resData.status, message: resData.message },
    });
  }
  return resData;
};

export function get(url) {
  return call(url, "GET");
}

export function post(url, data) {
  return call(url, "POST", data);
}

export function patch(url, data) {
  return call(url, "PATCH", data);
}

export function deleteReq(url, data) {
  return call(url, "DELETE", data);
}

export const usePost = (url) => {
  return useFetchAsync((data) => post(url, data));
};

export const usePatch = (url) => {
  return useFetchAsync((data) => patch(url, data));
};

export const useGet = (url) => {
  const result = useSWR(url, get);

  return { ...result, isLoading: result.isLoading };
};
