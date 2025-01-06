import { fireEvent, render, screen } from "@testing-library/react";
import Input from "./Input";

describe("Input element", () => {
  test("Render the input element", () => {
    render(
      <Input placeholder="Enter text" value="Hello world" onChange={() => {}} />
    );

    const inputElem = screen.getByPlaceholderText(/enter text/i);
    expect(inputElem).toBeInTheDocument();
  });

  test("Check input initial value", () => {
    render(
      <Input placeholder="Enter text" value="Hello World" onChange={() => {}} />
    );

    const inputElem = screen.getByPlaceholderText(/enter text/i);
    expect(inputElem.value).toBe("Hello World");
  });

  test("Check input initial empty value", () => {
    render(<Input placeholder="Enter text" value="" onChange={() => {}} />);

    const inputElem = screen.getByPlaceholderText(/enter text/i);
    expect(inputElem.value).toBe("");
  });

  test("Check input value onChange", () => {
    const handleChange = jest.fn(); // Create a mock function
    render(<Input placeholder="Enter text" value="" onChange={handleChange} />);

    const inputElem = screen.getByPlaceholderText(/enter text/i);
    fireEvent.change(inputElem, { target: { value: "Hello" } });

    expect(inputElem.value).toBe("Hello");
  });
});
