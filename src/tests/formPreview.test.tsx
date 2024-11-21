import { render, screen, fireEvent } from "@testing-library/react";
import FormPreview from "../components/FormPreview";
import { sampleSchema } from "../utils/sampleSchema";

test("should render form fields from JSON schema", () => {
  render(<FormPreview schema={sampleSchema} />);
  expect(screen.getByLabelText(/Full Name/)).toBeInTheDocument();
  expect(screen.getByLabelText(/Email Address/)).toBeInTheDocument();
});

test("should submit form data", () => {
  render(<FormPreview schema={sampleSchema} />);
  fireEvent.input(screen.getByLabelText(/Full Name/), { target: { value: "John Doe" } });
  fireEvent.click(screen.getByText(/Submit/));
  expect(console.log).toHaveBeenCalledWith({ name: "John Doe" });
});
