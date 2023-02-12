import { render, screen } from "@testing-library/react";
import Footer from "./Footer";

describe("Footer", () => {
  test("renders correctly", () => {
    render(<Footer />);
    expect(screen.getByText("Created by")).toBeInTheDocument();
  });

  test("Should have a link of hidayt rahman page", () => {
    render(<Footer />);
    expect(
      screen.getByRole("link", {
        name: "Hidayt Rahman",
      })
    ).toBeInTheDocument();
  });
});
