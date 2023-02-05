import { render, screen } from "@testing-library/react";
import Header from "./Header";

describe("Header", () => {
  test("renders correctly", () => {
    render(<Header />);
    expect(
      screen.getByRole("heading", {
        name: "💰 Expense Spy 🕵️",
      })
    ).toBeInTheDocument();
  });

  test("Should have a link of penless todo", () => {
    render(<Header />);
    expect(
      screen.getByRole("link", {
        name: "Penless todo",
      })
    ).toBeInTheDocument();

    expect(screen.getByText(/also try/i)).toBeInTheDocument();
  });
});
