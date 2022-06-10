type StartBtnsProps = {
  startGameHandler: () => void
  setSettingsOpen: (arg: boolean) => void
}

const StartBtns: React.FC<StartBtnsProps> = ({ startGameHandler, setSettingsOpen }) => {
  return (
    <div className="btn-container">
      <button className="start" aria-label="Start Quiz" onClick={startGameHandler}>
        Start
      </button>
      <button className="options" onClick={() => setSettingsOpen(true)}>
        Settings
      </button>
    </div>
  )
}

export default StartBtns
