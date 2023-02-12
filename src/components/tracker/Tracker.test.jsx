import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
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
    userEvent.setup();
    render(<Tracker />);
    const addNewBtn = screen.getByRole("button", { name: "Add New" });
    await userEvent.click(addNewBtn);
    expect(
      screen.getByRole("button", { name: "Show List" })
    ).toBeInTheDocument();
  });

  test("renders add income/expense modal after click", async () => {
    userEvent.setup();
    render(<Tracker />);
    const addNewBtn = screen.getByRole("button", { name: "Add New" });
    await userEvent.click(addNewBtn);
    expect(screen.getByTestId("trackerAddItem")).toBeInTheDocument();
  });
});
