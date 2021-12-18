import styled from "styled-components"
import { breakpoints } from "../breakpoints"

export const BtnPrimary = styled.button`
  padding: 0.5rem 1rem;
  color: var(--primary);
  background: white;
  border: 3px solid var(--primary);
  border-radius: 1.5rem;

  @media ${breakpoints.sm} {
    color: var(--primary);
  }
`

export const BtnSecondary = styled.button`
  padding: 0.5rem 1rem;
  color: white;
  background: var(--primary);
  border: 3px solid white;
  border-radius: 1.5rem;

  @media ${breakpoints.sm} {
    color: white;
  }
`
