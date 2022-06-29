import { useState, useEffect } from "react"
import styled from "styled-components"
import { breakpoints } from "../styles/breakpoints"

// parent comp is the MainNav

const ToggleButton = styled.button`
  --toggle-width: 80px;
  --toggle-height: 38px;
  --toggle-padding: 4px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  line-height: 1;
  width: var(--toggle-width);
  height: var(--toggle-height);
  padding: var(--toggle-padding);
  border: 0;
  border-radius: calc(var(--toggle-width) / 2);
  cursor: pointer;
  background-color: var(--color-bg-toggle);
  transition: background-color 0.25s ease-in-out;

  @media ${breakpoints.md} {
    --toggle-width: 80px;
    --toggle-height: 38px;
    --toggle-padding: 4px;
    font-size: 1.5rem;
    line-height: 1;
    width: var(--toggle-width);
    height: var(--toggle-height);
    padding: var(--toggle-padding);
  }

  &:focus {
    outline-offset: 2px;
  }
  &:focus:not(:focus-visible) {
    outline: none;
  }
  &:hover {
    box-shadow: 0 0 3px 1px var(--color-bg-toggle);
  }

  span {
    font-size: 1.4rem;
    margin: 0 0.1rem;
  }
`

interface ToggleThumbProps {
  activeTheme: string | undefined
}

const ToggleThumb = styled.span<ToggleThumbProps>`
  position: absolute;
  top: var(--toggle-padding);
  left: var(--toggle-padding);
  width: calc(var(--toggle-height) - (var(--toggle-padding) * 2));
  height: calc(var(--toggle-height) - (var(--toggle-padding) * 2));
  border-radius: 50%;
  background: white;
  transition: transform 0.23s ease-in-out;
  transform: ${p => (p.activeTheme === "dark" ? "translate3d(calc(var(--toggle-width) - var(--toggle-height) - 6px), 0, 0)" : "none")};
`

const ThemeToggle = () => {
  const [activeTheme, setActiveTheme] = useState(document.body.dataset.theme || "")
  const inactiveTheme = activeTheme === "light" ? "dark" : "light"

  useEffect(() => {
    document.body.dataset.theme = activeTheme
    window.localStorage.setItem("theme", activeTheme)
  }, [activeTheme])

  return (
    <ToggleButton aria-label={`Change to ${inactiveTheme} mode`} title={`Change to ${inactiveTheme} mode`} type="button" onClick={() => setActiveTheme(inactiveTheme)}>
      <ToggleThumb activeTheme={activeTheme} />
      <span aria-hidden={true}>🌙</span>
      <span aria-hidden={true}>☀️</span>
    </ToggleButton>
  )
}

export default ThemeToggle
