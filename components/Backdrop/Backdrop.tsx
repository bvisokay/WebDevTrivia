import styled from "styled-components"

const BackDropEl = styled.div`
  position: fixed;
  z-index: 1;
  background-color: rgba(0, 0, 0, 0.75);
  width: 100%;
  height: 100vh;
  top: 0;
  left: 0;
`

type backdropProps = {
  closeModalHandler: () => void
}

const Backdrop = (props: backdropProps) => {
  return <BackDropEl onClick={props.closeModalHandler} />
}

export default Backdrop
