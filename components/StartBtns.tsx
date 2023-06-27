import { useRef, useEffect } from "react"
import { BtnPrimary } from "../styles/GlobalComponents/Button"
import styled from "styled-components"
import { breakpoints } from "../styles/breakpoints"

const CX_HomeButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: -7rem;

  @media ${breakpoints.xs} {
    flex-direction: row;
    margin-top: -5rem;
  }
`

type StartBtnsProps = {
  startGameHandler: () => void
  setSettingsOpen: (arg: boolean) => void
}

const StartBtns: React.FC<StartBtnsProps> = ({ startGameHandler, setSettingsOpen }) => {
  const StartQuizButton = useRef<HTMLButtonElement>(null)

  // Focus on the Start Quiz Button When it is visible for better keyboard navigation
  useEffect(() => {
    if (StartQuizButton.current) {
      StartQuizButton.current.focus()
    }
  }, [])

  return (
    <CX_HomeButtonContainer>
      <BtnPrimary ref={StartQuizButton} aria-label="Start Quiz" onClick={startGameHandler}>
        Begin
      </BtnPrimary>
      <BtnPrimary onClick={() => setSettingsOpen(true)}>Settings</BtnPrimary>
    </CX_HomeButtonContainer>
  )
}

export default StartBtns
