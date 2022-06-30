import { useRef, useEffect } from "react"
import { BtnPrimary } from "../styles/GlobalComponents/Button"

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
    <div className="btn-container">
      <BtnPrimary ref={StartQuizButton} aria-label="Start Quiz" onClick={startGameHandler}>
        Begin
      </BtnPrimary>
      <BtnPrimary onClick={() => setSettingsOpen(true)}>Settings</BtnPrimary>
    </div>
  )
}

export default StartBtns
