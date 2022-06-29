import Link from "next/link"
import { useSession, signOut } from "next-auth/client"
//import { useContext } from "react"
//import { GlobalDispatchContext, GlobalStateContext } from "../store/GlobalContext"

import dynamic from "next/dynamic"
const ThemeToggle = dynamic(() => import("./ThemeToggle"), {
  ssr: false
})

// styles
import styled from "styled-components"
import { breakpoints } from "../styles/breakpoints"

// use context to say only if you are logged in can you see the admin link
// also the logout link

const NavContainer = styled.nav`
  ul {
    display: flex;
    flex-direction: column;
    margin: 0;
    padding: 0;
    align-items: center;

    @media ${breakpoints.sm} {
      flex-direction: row;
      flex-wrap: nowrap;
    }

    li {
      border: 1px solid aqua;
      text-align: center;
      white-space: nowrap;
      display: block;
      width: 100%;
      margin: 0;
      padding: 0.6rem 0;

      @media ${breakpoints.sm} {
        flex-direction: row;
        margin: 0 0.5rem;
        padding: 0.35rem;
      }

      /*   a:hover {
        cursor: pointer;
      }
      a:visited {
        color: var(--color-text-primary);
        text-decoration: none;
      } */
    }

    a:hover {
      cursor: pointer;
    }
    a:visited {
      color: var(--color-text-primary);
      text-decoration: none;
    }
  }
`

const MainNav = () => {
  //const appDispatch = useContext(GlobalDispatchContext)
  //const appState = useContext(GlobalStateContext)

  const [session /* isLoading */] = useSession()

  function logoutHandler() {
    void signOut()
  }

  return (
    <NavContainer>
      <ul>
        {/*  {!session && !isLoading && (
          <li>
            <Link href="/auth">
              <a>Login</a>
            </Link>
          </li>
        )} */}

        {session && (
          <>
            {/* <li>
              <Link href="/addQ">
                <a>Add Question</a>
              </Link>
            </li>
            <li>
              <Link href="/addCategory">
                <a>Add Category</a>
              </Link>
            </li> */}
            <li>
              <Link href="/manage">
                <a>Manage</a>
              </Link>
            </li>
            <li>
              <Link href="/profile">
                <a>Dashboard</a>
              </Link>
            </li>
          </>
        )}

        {session && (
          <li>
            <a onClick={logoutHandler}>Logout</a>
          </li>
        )}
        <ThemeToggle />
      </ul>
    </NavContainer>
  )
}

export default MainNav
