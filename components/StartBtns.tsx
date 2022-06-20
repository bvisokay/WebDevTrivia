import { BtnPrimary } from "../styles/GlobalComponents/Button"

type StartBtnsProps = {
  startGameHandler: () => void
  setSettingsOpen: (arg: boolean) => void
}

const StartBtns: React.FC<StartBtnsProps> = ({ startGameHandler, setSettingsOpen }) => {
  return (
    <div className="btn-container">
      <BtnPrimary autoFocus aria-label="Start Quiz" onClick={startGameHandler}>
        Begin
      </BtnPrimary>
      <BtnPrimary onClick={() => setSettingsOpen(true)}>Settings</BtnPrimary>
    </div>
  )
}

export default StartBtns
