import { useContext } from "react"
import { GlobalStateContext } from "../store/GlobalContext"
import styled from "styled-components"

const FlashMessageContainer = styled.div`
  //border: 2px solid crimson;
  //border-radius: 0.5rem;
`

const FlashMessageBox = styled.div`
  display: none;
  position: absolute;
  z-index: 999;
  top: 9rem;
  left: 50%;
  transform: translateX(-50%);
  -moz-animation: floatingAlert ease-in 3s forwards;
  -webkit-animation: floatingAlert ease-in 3s forwards;
  -o-animation: floatingAlert ease-in 3s forwards;
  animation: floatingAlert ease-in 3s forwards;
  -webkit-animation-fill-mode: forwards;
  animation-fill-mode: forwards;
  background-color: #fff;
  border: 2px solid var(--primary);
  border-radius: 0.5rem;
  padding: 0.5rem 1rem;
  color: var(--primary);
  font-weight: bold;

  :last-of-type {
    display: block;
  }

  @keyframes floatingAlert {
    0% {
      opacity: 0;
      visibility: hidden;
      transform: translateX(-50%) scale(1.2);
    }

    9% {
      opacity: 1;
      visibility: visible;
      transform: translateX(-50%) scale(1);
    }

    91% {
      opacity: 1;
      visibility: visible;
      transform: translateX(-50%) scale(1);
    }

    100% {
      opacity: 0;
      visibility: hidden;
      transform: translateX(-50%) scale(1.2);
    }
  }

  @-webkit-keyframes floatingAlert {
    0% {
      opacity: 0;
      visibility: hidden;
      transform: translateX(-50%) scale(1.2);
    }

    9% {
      opacity: 1;
      visibility: visible;
      transform: translateX(-50%) scale(1);
    }

    91% {
      opacity: 1;
      visibility: visible;
      transform: translateX(-50%) scale(1);
    }

    100% {
      opacity: 0;
      visibility: hidden;
      transform: translateX(-50%) scale(1.2);
    }
  }
`

const FlashMessages: React.FC = () => {
  const appState = useContext(GlobalStateContext)

  return (
    <FlashMessageContainer>
      {appState.flashMessages.map((msg: string, index: number) => {
        return <FlashMessageBox key={index}>{msg}</FlashMessageBox>
      })}
    </FlashMessageContainer>
  )
}
export default FlashMessages
