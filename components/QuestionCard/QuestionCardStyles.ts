import styled from "styled-components"
import { breakpoints } from "../../styles/breakpoints"

export const Wrapper = styled.div`
  max-width: 400px;
  /* background: #ebfeff; */
  background-color: var(--color-bg-primary);
  border-radius: 0.5rem;
  border: 2px solid var(--primary);
  padding: 20px;
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.25);
  text-align: center;
  margin: 1rem auto;
`

type ProgressBarProps = {
  percentComplete: number
}

export const ProgressBar = styled.div<ProgressBarProps>`
  position: relative;
  width: 100%;
  height: 12px;
  /* background: rgba(0, 0, 0, 0.1); */
  background: var(--tertiary);
  border-radius: 0.5rem;
  transition: transform 0.3s ease-out;
  margin-bottom: 1rem;

  ::before {
    content: "";
    position: absolute;
    width: ${props => props.percentComplete}%;
    height: 12px;
    transform-origin: left;
    top: 0;
    left: 0;
    background: linear-gradient(90deg, var(--primary), var(--primary));
    border-radius: 0.5rem;
  }
`

type ButtonWrapperProps = {
  correct: boolean
  userClicked: boolean
}

export const ButtonWrapper = styled.div<ButtonWrapperProps>`
  transition: all 0.3s ease;

  button {
    cursor: pointer;
    user-select: none;
    font-size: 0.8rem;
    width: 100%;
    padding: 0.4rem;
    margin: 5px 0;
    background: ${({ correct, userClicked }) => (correct ? "linear-gradient(90deg, var(--green), var(--greenmuted))" : !correct && userClicked ? "linear-gradient(90deg, var(--red), var(--redmuted))" : "linear-gradient(90deg, var(--primary), var(--primary))")};
    border: 3px solid #fff;
    box-shadow: 1px 2px 0px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    color: #fff;
    text-shadow: 0px 1px 0px rgba(0, 0, 0, 0.25);
  }

  :hover {
    opacity: 0.9;
  }
`

export const QuestionText = styled.p`
  margin: 1rem 0;
  font-size: 0.85rem;
  @media ${breakpoints.xs} {
    margin: 1.35rem 0;
    font-size: 1rem;
  }
  @media ${breakpoints.sm} {
    margin: 1.75rem 0;
    font-size: 1.15rem;
  }
`
