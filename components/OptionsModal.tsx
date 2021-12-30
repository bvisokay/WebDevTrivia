import React from "react"
import styled from "styled-components"

const BackDrop = styled.div`
  height: 100vh;
  width: 100vw;
  background: rgba(0, 0, 0, 0.75);
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`
const SettingsPanel = styled.div`
  min-height: 300px;
  width: 85%;
  max-width: 400px;
  background: #fff;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 1rem;
  max-width: 400px;

  form {
    //border: 2px solid green;
    width: 100%;
  }

  label {
    display: block;
    //border: 2px solid aqua;
    text-align: center;
    width: 100%;
    font-family: "Catamaran", sans-serif;
  }

  select {
    width: 100%;
    padding: 10px 0;
    border: 2px solid #d38558;
    background: whitesmoke;
    box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.25);
    border-radius: 10px;
    margin-bottom: 1rem;
  }

  option {
    text-align: center;
  }

  .btn-container {
    //border: 2px dashed aqua;
    display: flex;
    //align-items: center;
    justify-content: center;
    margin: 1rem 0;
  }

  .save,
  .cancel {
    cursor: pointer;
    background: linear-gradient(180deg, #fff, #ffcc91);
    border: 2px solid #d38558;
    box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.25);
    border-radius: 10px;
    height: 40px;
    margin: 0 8px;
    padding: 0 20px;
    width: 100px;
  }
`

const FormGroup = styled.div`
  //border: 2px solid hotpink;
  margin-bottom: 10px;
  padding: 0.25rem;
  border-radius: 10px; ;
`

interface OptionsModalProps {
  setSelectedTotalQs: (value: number) => void
  setSelectedDifficulty: (value: string) => void
  saveSettingsHandler: (e: React.FormEvent) => void
  closeSettingsHandler: () => void
}

const OptionsModal: React.FC<OptionsModalProps> = ({ setSelectedTotalQs, setSelectedDifficulty, saveSettingsHandler, closeSettingsHandler }) => {
  return (
    <BackDrop>
      <SettingsPanel>
        <form onSubmit={saveSettingsHandler}>
          <FormGroup>
            <label htmlFor="">Number of Questions</label>
            <select
              name="Number of Questions"
              id="numQ"
              onChange={e => {
                const selectedQuestionNr = e.target.value
                setSelectedTotalQs(+selectedQuestionNr)
              }}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="25">25</option>
            </select>
          </FormGroup>

          <FormGroup>
            <label htmlFor="">Difficulty</label>
            <select
              name="Number of Questions"
              id="numQ"
              onChange={e => {
                const selectedDifficulty = e.target.value
                setSelectedDifficulty(selectedDifficulty)
              }}
            >
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </FormGroup>

          <div className="btn-container">
            <button type="submit" className="save">
              Start
            </button>
            <button type="button" className="cancel" onClick={closeSettingsHandler}>
              Cancel
            </button>
          </div>
        </form>
      </SettingsPanel>
    </BackDrop>
  )
}

export default OptionsModal
