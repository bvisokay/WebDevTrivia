import styled from "styled-components"
import { breakpoints } from "../styles/breakpoints"

export const HeaderContainer = styled.div`
  background: transparent;
  width: 100%;
  background-color: var(--color-bg-header);
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  color: var(--color-text-primary);
  font-family: var(--font-secondary);
  padding: 0.5rem 1.5rem;
  max-width: var(--wrapper-width);
  margin: 0 auto;

  @media ${breakpoints.sm} {
    justify-content: space-between;
  }
  @media ${breakpoints.md} {
    flex-direction: row;
    justify-content: space-between;
  }

  a.logoText {
    font-family: var(--font-secondary);
    color: var(--color-text-primary);
    text-decoration: none;
    font-size: 3rem;
    letter-spacing: 1.5px;
    text-align: center;
    text-decoration: none;
    margin-bottom: 4px;

    @media ${breakpoints.xs} {
      font-size: 3.5rem;
    }

    @media ${breakpoints.sm} {
      font-size: 4rem;
    }

    @media ${breakpoints.sm} {
      padding-top: 0.5rem;
    }

    :visited {
      color: var(--color-text-primary);
      text-decoration: none;
    }
  }
`

export default Container
