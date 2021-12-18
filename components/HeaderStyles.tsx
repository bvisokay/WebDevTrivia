import styled from "styled-components"

export const HeaderContainer = styled.div`
  background: var(--primary);
  width: 100%;
`

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: white;
  font-family: "Catamaran", sans-serif;
  padding: 1rem;
  max-width: var(--wrapper-width);
  margin: 0 auto;
`

export default Container
