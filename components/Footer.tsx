import styled from "styled-components"
import { breakpoints } from "../styles/breakpoints"
//import { Wrapper } from "../styles/GlobalComponents"

const FooterContainer = styled.div`
  //background: var(--transparent-light);
  color: white;

  ul {
    display: flex;
    padding: 1rem 0;
    justify-content: flex-end;
  }

  li {
    margin: 0 0.5rem;
    padding: 0.5rem;

    a {
      color: #fff;
    }

    a:hover {
      cursor: pointer;
    }
  }

  @media ${breakpoints.xs} {
    font-size: 1rem;
  }
  @media ${breakpoints.md} {
    font-size: 1rem;
  }
`

const Footer = () => {
  return <FooterContainer>{/* <Wrapper>WebDev Trivia</Wrapper> */}</FooterContainer>
}

export default Footer
