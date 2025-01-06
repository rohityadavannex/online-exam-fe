import {
  formatNumber,
  getCityLabel,
  getCountryLabel,
  getFormattedDate,
  getQueryData,
  getStateLabel,
} from "./helpers";

test("Get Country Label", () => {
  expect(getCountryLabel("IN")).toBe("India");
});

test("Get State Label", () => {
  expect(getStateLabel("RJ")).toBe("Rajasthan");
});

test("Get City Label", () => {
  expect(getCityLabel("1")).toBe("Mumbai");
});

test("Get Formatted Number", () => {
  expect(formatNumber(20000)).toBe("20,000");
});

test("get formatted Date", () => {
  expect(getFormattedDate("2024-08-13T10:00:18.000Z")).toBe("13 Aug 2024");
});

describe("getQueryData function", () => {
  test("should return correct query string for no parameter", () => {
    expect(getQueryData({})).toBe("");
  });

  test("should return correct query string for single parameter", () => {
    expect(getQueryData({ name: "John Doe" })).toBe("?name=John Doe");
  });

  test("should return correct query string for multiple parameters", () => {
    expect(getQueryData({ name: "John Doe", age: 40 })).toBe(
      "?name=John Doe&age=40"
    );
  });
});
