import Link from "next/link"
import { useSession, signOut } from "next-auth/react"
import { useRouter } from "next/router"
//import { useContext } from "react"
//import { GlobalDispatchContext, GlobalStateContext } from "../store/GlobalContext"
import { BiHelpCircle } from "react-icons/bi"
import { CX_IconDiv } from "../styles/GlobalComponents"

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
    padding: 0;
    align-items: center;

    @media ${breakpoints.sm} {
      flex-direction: row;
      flex-wrap: nowrap;
    }

    li {
      text-align: center;
      white-space: nowrap;
      display: block;
      width: 100%;

      @media ${breakpoints.sm} {
        flex-direction: row;
      }
    }

    a {
      display: block;
      :hover {
        cursor: pointer;
      }
      :visited {
        color: var(--color-text-primary);
        text-decoration: none;
      }
    }

    button.main-nav__btn {
      border: none;
      background-color: transparent;
      color: var(--color-text-primary);
      font-family: var(--font-primary);
      font-size: 1rem;
      margin: 0;

      :hover {
        cursor: pointer;
      }
    }

    li,
    li > a,
    button.main-nav__btn {
      padding: 0.25rem 0.5rem;
    }
  }
`

const NavIconContainer = styled.div`
  display: flex;
`

const MainNav = () => {
  //const appDispatch = useContext(GlobalDispatchContext)
  //const appState = useContext(GlobalStateContext)
  const router = useRouter()
  const { status } = useSession()

  function logoutHandler() {
    void signOut()
    void router.push("/")
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

        {status === "authenticated" && (
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

        {status === "authenticated" && (
          <li>
            <button className="main-nav__btn" onClick={logoutHandler}>
              Logout
            </button>
          </li>
        )}

        <NavIconContainer>
          <ThemeToggle />
          <CX_IconDiv>
            <Link href="/support">
              <BiHelpCircle />
            </Link>
          </CX_IconDiv>
        </NavIconContainer>
      </ul>
    </NavContainer>
  )
}

export default MainNav
