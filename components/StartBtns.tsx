type StartBtnsProps = {
  startTrivia: () => void
  setSettingsOpen: (arg: boolean) => void
}

const StartBtns: React.FC<StartBtnsProps> = ({ startTrivia, setSettingsOpen }) => {
  return (
    <div>
      <button aria-label="Start Quiz" onClick={startTrivia}>
        Start
      </button>
      <button onClick={() => setSettingsOpen(true)}>Settings</button>
    </div>
  )
}

export default StartBtns
