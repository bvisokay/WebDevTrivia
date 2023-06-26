import { useState, useEffect } from "react"
import { BsSunFill, BsFillMoonStarsFill } from "react-icons/bs"
import { CX_IconDiv } from "../styles/GlobalComponents"

// parent comp is the MainNav

const ThemeToggle = () => {
  const [activeTheme, setActiveTheme] = useState(document.body.dataset.theme || "")
  const inactiveTheme = activeTheme === "light" ? "dark" : "light"

  useEffect(() => {
    document.body.dataset.theme = activeTheme
    window.localStorage.setItem("theme", activeTheme)
  }, [activeTheme])

  return (
    <CX_IconDiv aria-label={`Change to ${inactiveTheme} mode`} title={`Change to ${inactiveTheme} mode`} type="button" onClick={() => setActiveTheme(inactiveTheme)}>
      {activeTheme === "dark" ? <BsSunFill aria-hidden={true} /> : <BsFillMoonStarsFill aria-hidden={true} />}
    </CX_IconDiv>
  )
}

export default ThemeToggle
