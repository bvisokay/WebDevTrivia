import styled from "styled-components"

const Container = styled.div`
  display: flex;
  min-height: 100vh;
  flex-direction: column;
`

const Layout: React.FC = props => {
  return <Container>{props.children}</Container>
}

export default Layout
