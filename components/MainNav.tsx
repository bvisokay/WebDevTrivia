import Link from "next/link"
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
  return (
    <NavContainer>
      <ul>
        <li>
          <Link href="/">
            <a>Home</a>
          </Link>
        </li>
        <li>
          <Link href="/">
            <a>Support</a>
          </Link>
        </li>
        <li>
          <Link href="/">
            <a>About</a>
          </Link>
        </li>
        <li>
          <Link href="/">
            <a>Login</a>
          </Link>
        </li>
        <li>
          <Link href="/">
            <a>Logout</a>
          </Link>
        </li>
        <li>
          <Link href="/">
            <a>Register</a>
          </Link>
        </li>
        <li>
          <Link href="/addQuestion">
            <a>Admin</a>
          </Link>
        </li>
      </ul>
    </NavContainer>
  )
}

export default MainNav
