import Header from "./Header"
import Footer from "./Footer"
import FlashMessages from "./FlashMessages"

import styled from "styled-components"

const LayoutContainer = styled.div`
  display: flex;
  min-height: 100%;
  min-height: 100vh;
  flex-direction: column;
  //border: 1px solid red;
  margin: 0 auto;
  position: relative;
`

const Container = styled.div`
  flex: 1;
  padding: 0.5rem;
  width: 100%;
  max-width: var(--wrapper-width);
  margin: 0 auto;
  min-width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const Layout: React.FC = props => {
  return (
    <LayoutContainer>
      <Header />
      <FlashMessages />
      <Container>{props.children}</Container>
      <Footer />
    </LayoutContainer>
  )
}

export default Layout
