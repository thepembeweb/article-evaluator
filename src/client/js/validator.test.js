import URL_REGEX from "./validator";

test("validate valid url", () => {
  expect(URL_REGEX.test("http://www.google.com")).toBe(true);
});

test("validate invalid url", () => {
  expect(URL_REGEX.test("http:/")).toBe(false);
});
