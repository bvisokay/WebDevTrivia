import Header from "./Header"
import Footer from "./Footer"

import styled from "styled-components"

const LayoutContainer = styled.div`
  display: flex;
  min-height: 100%;
  min-height: 100vh;
  flex-direction: column;
`

const Container = styled.div`
  flex: 1;
  padding: 1rem;
  border: 1px solid #999;
  width: 100%;
  max-width: var(--wrapper-width);
  margin: 0 auto;
`

const Layout: React.FC = props => {
  return (
    <LayoutContainer>
      <Header />
      <Container>{props.children}</Container>
      <Footer />
    </LayoutContainer>
  )
}

export default Layout
