import { useContext } from "react"
import { GlobalStateContext } from "../store/GlobalContext"
import Link from "next/link"
import styled from "styled-components"
import { Wrapper } from "../styles/GlobalComponents"
import { breakpoints } from "../styles/breakpoints"

//import { useSession } from "next-auth/client"

const FooterContainer = styled.div`
  background: var(--transparent-light);
  color: white;

  ul {
    display: flex;
    padding: 1rem 0;
    justify-content: flex-end;
  }

  li {
    //border: 1px solid red;
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

const Help = styled.li`
  padding: 0.1rem;
  background-color: var(--primary);
  border-radius: 50%;
`

const Footer = () => {
  /* const [session, isLoading] = useSession() */
  const appState = useContext(GlobalStateContext)

  return (
    <FooterContainer>
      <Wrapper>
        <ul>
          {appState.gameOver && (
            <Help>
              <Link href="/support">
                <a>&#63;{/* Question Mark */}</a>
              </Link>
            </Help>
          )}

          {/* <li>
            <Link href="/about">
              <a>About</a>
            </Link>
          </li> */}

          {/*  {!session && !isLoading && (
            <li>
              <Link href="/auth">
                <a>Login</a>
              </Link>
            </li>
          )} */}
        </ul>
      </Wrapper>
    </FooterContainer>
  )
}

export default Footer
