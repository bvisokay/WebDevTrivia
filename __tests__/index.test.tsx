import { render, screen } from "@testing-library/react"
import Home from "../pages"
import "@testing-library/jest-dom"

describe("Home", () => {
  it("Render the homepage with start button", () => {
    render(<Home />)

    const startButton = screen.getByRole("button", { name: /start quiz/i })

    expect(startButton).toBeInTheDocument()
  })
})
