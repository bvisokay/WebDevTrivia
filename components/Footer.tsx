import Link from "next/link"
import styled from "styled-components"
import { Wrapper } from "../styles/GlobalComponents"
import { breakpoints } from "../styles/breakpoints"

import { useSession, signOut } from "next-auth/client"
import { useContext } from "react"
import { GlobalDispatchContext, GlobalStateContext } from "../store/GlobalContext"

const FooterContainer = styled.div`
  background: var(--transparent-light);
  color: white;

  ul {
    display: flex;
    padding: 1rem 0;
    justify-content: space-between;
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
  background-color: var(--secondary);
  border-radius: 50%;
`

const Footer = () => {
  const appDispatch = useContext(GlobalDispatchContext)
  const appState = useContext(GlobalStateContext)

  const [session, isLoading] = useSession()

  function logoutHandler() {
    signOut()
  }

  return (
    <FooterContainer>
      <Wrapper>
        <ul>
          <Help>
            <Link href="/support">
              <a>&#63;{/* Question Mark */}</a>
            </Link>
          </Help>

          {/* <li>
            <Link href="/about">
              <a>About</a>
            </Link>
          </li> */}

          {!session && !isLoading && (
            <li>
              <Link href="/auth">
                <a>Login</a>
              </Link>
            </li>
          )}
        </ul>
      </Wrapper>
    </FooterContainer>
  )
}

export default Footer
