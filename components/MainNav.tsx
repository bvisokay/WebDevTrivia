import Link from "next/link"
import { useSession, signOut } from "next-auth/client"
import styled from "styled-components"
import { breakpoints } from "../styles/breakpoints"

// use context to say only if you are logged in can you see the admin link
// also the logout link

const NavContainer = styled.nav`
  //border: 1px solid aqua;

  ul {
    //border: 1px solid green;
    display: flex;
    flex-direction: column;
    margin: 0;
    padding: 0;

    @media ${breakpoints.sm} {
      flex-direction: row;
      align-items: center;
      flex-wrap: nowrap;
    }

    li {
      //border: 1px solid red;
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

      a:hover {
        cursor: pointer;
      }
    }
  }
`

const MainNav = () => {
  const [session, isLoading] = useSession()

  function logoutHandler() {
    signOut()
  }

  return (
    <NavContainer>
      <ul>
        {/*  <li>
          <Link href="/">
            <a>Home</a>
          </Link>
        </li> */}

        <li>
          <Link href="/">
            <a>Start</a>
          </Link>
        </li>

        {!session && !isLoading && (
          <li>
            <Link href="/auth">
              <a>Login</a>
            </Link>
          </li>
        )}

        {session && (
          <>
            <li>
              <Link href="/addQ">
                <a>Add Question</a>
              </Link>
            </li>
            <li>
              <Link href="/addCategory">
                <a>Add Category</a>
              </Link>
            </li>
            <li>
              <Link href="/manage">
                <a>Admin</a>
              </Link>
            </li>
            <li>
              <Link href="/profile">
                <a>Profile</a>
              </Link>
            </li>
          </>
        )}

        {session && (
          <li>
            <a href="#" onClick={logoutHandler}>
              Logout
            </a>
          </li>
        )}
      </ul>
    </NavContainer>
  )
}

export default MainNav
