import styled from "styled-components"
//import BackgroundAnimation from "./BackgroundAnimation"
//import FailAnimation from "./FailAnimation"

const Wrapper = styled.div<Percentage>`
  width: 100%;
  max-width: 400px;
  background: #ebfeff;
  //background: #ebfeff;
  border-radius: 10px;
  // green if passing or red if failed?
  border: 2px solid var(--primary);
  padding: 0.5rem;
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.25);
  text-align: center;
  margin: 2rem auto;

  h2,
  h3,
  .percentage {
    font-family: "bungee", sans-serif;
    margin: 0;
    padding: 1rem;
    line-height: 1;
    color: var(--primary);
    //color: #56ccff;
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
    padding: 0;
    //border-radius: 50%;
    //filter: hue-rotate(145deg);
    border: 3px solid #fff;
    border-radius: 10px;
    box-shadow: 1px 2px 10px rgba(0, 0, 0, 0.2);
  }
`

type ResultsProps = {
  score: number
  selectedTotalQs: number
}

type Percentage = {
  percentage: number
}

const ResultsCard: React.FC<ResultsProps> = ({ score, selectedTotalQs }) => {
  const percentage = (score / selectedTotalQs) * 100
  const pass = ["pass-jep.mp4", "pass-rocky.mp4"]
  return (
    <Wrapper percentage={percentage}>
      <h2>
        RESULTS:<span className="percentage">{percentage}%</span>
      </h2>
      <h3>
        ({score} out of {selectedTotalQs})
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
