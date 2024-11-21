import { render, screen, fireEvent } from "@testing-library/react";
import FormEditor from "../components/FormEditor";
import { sampleSchema } from "../utils/sampleSchema";

test("should update schema on valid JSON input", () => {
  const onChange = jest.fn();
  render(<FormEditor schema={sampleSchema} onChange={onChange} />);

  const textarea = screen.getByRole("textbox");
  fireEvent.change(textarea, { target: { value: JSON.stringify(sampleSchema) } });

  expect(onChange).toHaveBeenCalled();
});
