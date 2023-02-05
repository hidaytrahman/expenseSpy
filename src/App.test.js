import { render, screen } from "@testing-library/react";
import App from "./App";

describe("Landing App", () => {
  test("renders correctly", () => {
    render(<App />);
    expect(
      screen.getByRole("heading", {
        name: "Track your expenses! 💸",
      })
    ).toBeInTheDocument();
    const paraElement = screen.getByText(
      /keeping track of your expenses is an important part of managing your overall finances\./i
    );
    expect(paraElement).toBeInTheDocument();
  });
});
