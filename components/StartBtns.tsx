import { BtnPrimary } from "../styles/GlobalComponents/Button"

type StartBtnsProps = {
  startGameHandler: () => void
  setSettingsOpen: (arg: boolean) => void
}

const StartBtns: React.FC<StartBtnsProps> = ({ startGameHandler, setSettingsOpen }) => {
  return (
    <div className="btn-container">
      <BtnPrimary className="start" aria-label="Start Quiz" onClick={startGameHandler}>
        Begin
      </BtnPrimary>
      <BtnPrimary className="options" onClick={() => setSettingsOpen(true)}>
        Settings
      </BtnPrimary>
    </div>
  )
}

export default StartBtns
