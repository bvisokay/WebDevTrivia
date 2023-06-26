import styled from "styled-components"
//import BackgroundAnimation from "./BackgroundAnimation"
//import FailAnimation from "./FailAnimation"
import { useContext } from "react"
import { GlobalStateContext } from "../store/GlobalContext"

const Wrapper = styled.div<Percentage>`
  width: 80%;
  max-width: 450px;
  background-color: var(--color-bg-primary);
  border-radius: var(--roundness);
  border: var(--border-width) solid ${props => (props.percentage >= 70 ? "var(--green)" : "var(--red)")};
  padding: 20px;
  box-shadow: var(--box-shadow);
  text-align: center;
  margin: 2rem auto;

  h2,
  h3,
  .percentage {
    font-family: var(--font-secondary);
    margin: 0;
    padding: 1rem;
    line-height: 1;
    color: var(--color-text-primary);
    font-size: 2rem;
  }

  h3 {
    font-family: monospace, sans-serif;
    font-size: 1rem;
    padding: 0.25rem;
  }

  .percentage {
    color: ${props => (props.percentage >= 70 ? "var(--green)" : "var(--red)")};
  }
`

const GifWrapper = styled.div`
  margin: 0;
  //border: 2px solid hotpink;
  width: 100%;

  video {
    display: block;
    max-width: 140px;
    margin: 1rem auto;
    padding: -2px;
    border-radius: var(--roundness);
    box-shadow: var(--box-shadow);
  }
`

type ResultsProps = {
  score: number
}

type Percentage = {
  percentage: number
}

const ResultsCard: React.FC<ResultsProps> = ({ score }) => {
  const appState = useContext(GlobalStateContext)
  const percentage = (score / appState.selectedTotalQs) * 100
  const pass = ["pass-jep.mp4", "pass-rocky.mp4"]
  return (
    <Wrapper percentage={percentage}>
      <h2>
        RESULTS:<span className="percentage">{Math.round(percentage)}&#37;</span>
      </h2>
      <h3>
        ({score} out of {appState.selectedTotalQs})
      </h3>

      <GifWrapper>
        <video autoPlay loop playsInline>
          <source src={percentage < 70 ? "fail-pigs.mp4" : pass[Math.floor(Math.random() * pass.length)]} />
        </video>
      </GifWrapper>
    </Wrapper>
  )
}

export default ResultsCard
