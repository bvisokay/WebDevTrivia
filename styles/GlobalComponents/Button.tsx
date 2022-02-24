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

export const BtnTertiary = styled.button`
  cursor: pointer;
  background: linear-gradient(180deg, #fff, #ffcc91);
  border: 2px solid #d38558;
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.25);
  border-radius: 0.5rem;
  height: 40px;
  margin: 20px 4px;
  padding: 0 20px;
  min-width: 100px;
  color: orangered;

  :disabled {
    cursor: wait;
    background: linear-gradient(180deg, #fff, #ffe1bf);
    border: 2px solid #ca9c81;
    color: #ff7d4e;
  }

  :focus {
    outline: 2px solid #ff7d4e;
  }
`

export const BtnSmall = styled.button`
  margin: 4px 2px;
  padding: 4px;
  font-family: var(--font-primary);
  color: #fff;
  cursor: pointer;
  background: var(--cinco);
  border: none;
  border-radius: 0.25rem;
  font-size: 0.7rem;

  @media ${breakpoints.sm} {
    font-size: 0.8rem;
    font-weight: 700;
  }
`
