import styled from "styled-components"
import { breakpoints } from "../breakpoints"

export const BtnPrimary = styled.button`
  margin: 0.6rem 0.2rem;
  padding: 0.4rem 0.5rem 0.25rem 0.5rem;
  color: white;
  cursor: pointer;
  background: linear-gradient(45deg, var(--primary), var(--primary));
  border: var(--border-width) solid var(--primary);
  border-radius: var(--roundness);
  box-shadow: var(--box-shadow);
  font-size: 0.8rem;
  letter-spacing: 0.8px;
  min-width: 75px;
  font-family: var(--font-secondary);

  @media ${breakpoints.sm} {
    font-size: 1.1rem;
    min-width: 100px;
  }

  @media ${breakpoints.md} {
    font-size: 1.2rem;
    min-width: 100px;
  }

  :disabled {
    cursor: wait;
    background-color: var(--tertiary);
  }

  :hover {
    opacity: 0.9;
    border: var(--border-width) solid var(--primary);
  }

  /* Focusing the button with a keyboard */
  :focus-visible {
    outline: var(--border-width) solid var(--cuatro);
  }
`

export const BtnSmall = styled.button`
  margin: 4px 2px;
  padding: 4px;
  font-family: var(--font-primary);
  color: #fff;
  cursor: pointer;
  background: var(--primary);
  border: none;
  border-radius: var(--roundness);
  font-size: 0.7rem;

  @media ${breakpoints.sm} {
    font-size: 0.8rem;
    font-weight: 700;
  }
`

export const ResetBtn = styled.button`
  margin: 1rem 0.5rem;
  padding: 0.5rem 1rem;
  font-family: var(--font-secondary);
  color: #fff;
  cursor: pointer;
  background: var(--primary);
  border: 3px solid var(--primary);
  border-radius: var(--roundness);
  font-size: 1rem;

  @media ${breakpoints.md} {
    font-size: 1.25rem;
  }

  :hover {
    opacity: 0.9;
    border: 3px solid var(--primary);
  }

  /* Focusing the button with a keyboard */
  :focus-visible {
    outline: 3px solid var(--cuatro);
  }
`

export const IconContainer = styled.button`
  background-color: transparent;
`
