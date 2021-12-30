type StartBtnsProps = {
  startTrivia: () => void
  setSettingsOpen: (arg: boolean) => void
}

const StartBtns: React.FC<StartBtnsProps> = ({ startTrivia, setSettingsOpen }) => {
  return (
    <div className="btn-container">
      <button className="start" aria-label="Start Quiz" onClick={startTrivia}>
        Start
      </button>
      <button className="options" onClick={() => setSettingsOpen(true)}>
        Settings
      </button>
    </div>
  )
}

export default StartBtns
