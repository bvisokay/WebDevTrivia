import Link from "next/link"
import { useSession, signOut } from "next-auth/client"
import styled from "styled-components"

// use context to say only if you are logged in can you see the admin link
// also the logout link

const NavContainer = styled.nav`
  //border: 1px solid aqua;

  ul {
    display: flex;
    flex-direction: row;

    li {
      //border: 1px solid red;
      margin: 0 0.5rem;
      padding: 0.25rem;
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
        <li>
          <Link href="/">
            <a>Home</a>
          </Link>
        </li>
        <li>
          <Link href="/support">
            <a>Support</a>
          </Link>
        </li>
        <li>
          <Link href="/about">
            <a>About</a>
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
          <li>
            <Link href="/addQuestion">
              <a>Admin</a>
            </Link>
          </li>
        )}

        {session && (
          <li>
            <button onClick={logoutHandler}>Logout</button>
          </li>
        )}
      </ul>
    </NavContainer>
  )
}

export default MainNav
