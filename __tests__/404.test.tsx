import { render, screen } from "@testing-library/react"
import NotFoundPage from "../pages/404"

describe("Render 404 Page", () => {
  test("renders NotFoundPage", () => {
    render(<NotFoundPage />)
    const heading = screen.getByText("Not Found")
    expect(heading).toBeInTheDocument()
  })
})
