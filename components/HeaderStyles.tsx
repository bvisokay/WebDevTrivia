import styled from "styled-components"
import { breakpoints } from "../styles/breakpoints"

export const HeaderContainer = styled.div`
  background: var(--primary);
  width: 100%;
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  color: white;
  font-family: "Catamaran", sans-serif;
  padding: 1rem;
  max-width: var(--wrapper-width);
  margin: 0 auto;

  @media ${breakpoints.sm} {
    justify-content: space-between;
  }
  @media ${breakpoints.md} {
    flex-direction: row;
    justify-content: space-between;
  }

  a {
    color: white;
    margin: 0;
    padding: 0;
    //border: 1px solid violet;
  }
`

export default Container
