import React, { useContext, useEffect } from "react"
import { GlobalStateContext, GlobalDispatchContext } from "../store/GlobalContext"
import styled from "styled-components"
import { FaWindowClose } from "react-icons/fa"

const FlashMessageContainer = styled.div`
  width: 80%;
  max-width: 450px;
  border-radius: var(--roundness);
  position: absolute;
  display: block;
  margin: 0 auto;
  left: 50%;
  transform: translateX(-50%);
  top: 160px;
  z-index: 999;
`

const FlashMessageBox = styled.div`
  --animation-time: 10s;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 999;
  background-color: var(--msg-bg-color);
  border: var(--border-width) solid var(--primary);
  border-radius: var(--roundness);
  margin: 0.5rem 0;
  padding: 1rem 1rem;
  color: var(--msg-color);
  font-weight: bold;

  button {
    padding: 0;
    margin: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    border: var(--border-width) solid transparent;
    border-radius: var(--roundness);
    background-color: transparent;
    color: white;
    font-size: 0.7rem;
    padding: 0 0.15rem;
    font-weight: 700;
    svg {
      font-size: 1.5rem;
      fill: var(--msg-color);
    }
    :hover {
      cursor: pointer;
    }
    :focus {
      outline: var(--border-width) solid var(--msg-color);
      border-radius: var(--roundness);
    }
  }
`

const FlashMessages: React.FC = () => {
  const appState = useContext(GlobalStateContext)
  const appDispatch = useContext(GlobalDispatchContext)

  const hideFlashMsgHandler = (e: React.MouseEvent) => {
    e.preventDefault()

    // targeting the actual message content to close
    let msgToDelete = (e.target as HTMLElement).previousElementSibling?.textContent as string

    // if the button is clicked via keyboard the msg is the sibling
    if (typeof msgToDelete !== "undefined") {
      appDispatch({ type: "removeFlashMessage", value: msgToDelete })
    }

    // but if the icon is clicked the msg is the sibling of the icons's parent
    if (typeof msgToDelete === "undefined") {
      msgToDelete = (e.target as HTMLElement).parentElement?.previousElementSibling?.textContent as string
      appDispatch({ type: "removeFlashMessage", value: msgToDelete })
    }

    // but if this doesn't work it may be the path of the svg was clicked?!
    if (typeof msgToDelete === "undefined") {
      msgToDelete = (e.target as HTMLElement).parentElement?.parentElement?.previousElementSibling?.textContent as string
      appDispatch({ type: "removeFlashMessage", value: msgToDelete })
    }
  }

  // pretty abrupt entry and exit so animate
  useEffect(() => {
    if (appState.flashMessages) {
      const timer = setTimeout(() => {
        appDispatch({ type: "clearFlashMessages" })
      }, 5000)

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
            <button aria-label="close message" onClick={hideFlashMsgHandler}>
              <FaWindowClose />
            </button>
          </FlashMessageBox>
        )
      })}
    </FlashMessageContainer>
  )
}
export default FlashMessages
