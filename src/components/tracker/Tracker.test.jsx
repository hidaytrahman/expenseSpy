import { render, screen } from "@testing-library/react";
import Tracker from "./Tracker";

describe("Expernse Tracker", () => {
  test("renders correctly", () => {
    render(<Tracker />);
    expect(
      screen.getByText(/what are you thinking, add your first expense\? 😉/i)
    ).toBeInTheDocument();
  });

  test("Should have add new button", () => {
    render(<Tracker />);
    expect(screen.getByRole("button", { name: "Add New" })).toBeInTheDocument();
  });

  test("changes text as `Show List` on click of 'Add New' button", async () => {
    render(<Tracker />);
  });
});
