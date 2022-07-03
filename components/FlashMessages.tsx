import React, { useContext, useEffect } from "react"
import { GlobalStateContext, GlobalDispatchContext } from "../store/GlobalContext"
import styled from "styled-components"
//import { FaWindowClose } from "react-icons/fa"
import { breakpoints } from "../styles/breakpoints"

const FlashMessageContainer = styled.div`
  //border: 2px solid salmon;
  border-radius: 0.5rem;
  position: absolute;
  width: 100%;
  max-width: 96%;
  display: block;
  margin: 0 auto;
  left: 50%;
  transform: translateX(-50%);
  top: 160px;
  z-index: 999;

  @media ${breakpoints.sm} {
    max-width: var(--wrapper-width-narrow);
  }
`

const FlashMessageBox = styled.div`
  --animation-time: 3s;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 999;
  background-color: #fff;
  border: 2px solid var(--primary);
  border-radius: 0.5rem;
  margin: 0.5rem 0;
  padding: 0.5rem 1rem;
  color: var(--primary);
  font-weight: bold;

  button {
    padding: 0;
    margin: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 2px solid transparent;
    border-radius: 2px;
    background-color: var(--primary);
    color: white;
    font-size: 0.7rem;
    padding: 0 0.15rem;
    font-weight: 700;
    svg {
      font-size: 1.25rem;
      fill: red;
    }
    :hover {
      cursor: pointer;
    }
    :focus {
      outline: 2px solid black;
      border-radius: 2px;
    }
  }
`

const FlashMessages: React.FC = () => {
  const appState = useContext(GlobalStateContext)
  const appDispatch = useContext(GlobalDispatchContext)

  const hideFlashMsgHandler = (e: React.MouseEvent) => {
    e.preventDefault()
    console.log("triggered")

    const msgToDelete = (e.target as HTMLElement).previousElementSibling?.textContent as string
    if (typeof msgToDelete !== "undefined") {
      console.log("msgToDelete")
      console.log(msgToDelete)
      appDispatch({ type: "removeFlashMessage", value: msgToDelete })
    }
  }

  // pretty abrupt entry and exit so animate soon
  useEffect(() => {
    if (appState.flashMessages) {
      const timer = setTimeout(() => {
        appDispatch({ type: "clearFlashMessages" })
      }, 3000)

      return () => {
        clearTimeout(timer)
      }
    }
  }, [appState.flashMessages])

  return (
    <FlashMessageContainer>
      {appState.flashMessages.map((msg: string, index: number) => {
        return (
          <FlashMessageBox key={index}>
            <span>{msg}</span>
            <button onClick={hideFlashMsgHandler}>X</button>
          </FlashMessageBox>
        )
      })}
    </FlashMessageContainer>
  )
}
export default FlashMessages
