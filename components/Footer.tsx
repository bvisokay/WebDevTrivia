import styled from "styled-components"
import { Wrapper } from "../styles/GlobalComponents"
import { breakpoints } from "../styles/breakpoints"

const FooterContainer = styled.div`
  background: var(--primary);
  color: white;
  font-family: "Bungee", sans-serif;
  padding: 1rem;
  //font-family: "Fascinate Inline", Arial, Helvetica, sans-serif;

  @media ${breakpoints.xs} {
    font-size: 1rem;
  }
  @media ${breakpoints.sm} {
    font-size: 1.5rem;
  }
`

export default function Footer() {
  return (
    <FooterContainer>
      <Wrapper>
        <h2>Footer</h2>
      </Wrapper>
    </FooterContainer>
  )
}
