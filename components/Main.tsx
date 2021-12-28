import { useContext } from "react"

//context
import { GlobalDispatchContext } from "../store/GlobalContext"

//comps
import LanguagePreference from "./Language"
import styled from "styled-components"
import { SITENAME } from "../pages/_app"

const Container = styled.div`
  flex: 1;
`

const Main: React.FC = ({ children }) => {
  return (
    <Container>
      {children}
      <LanguagePreference />
    </Container>
  )
}

export default Main
