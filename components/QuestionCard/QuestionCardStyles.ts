import styled from "styled-components"
import { breakpoints } from "../../styles/breakpoints"

export const Wrapper = styled.div`
  width: 80%;
  max-width: 450px;
  background-color: var(--color-bg-primary);
  border-radius: var(--roundness);
  border: var(--border-width) solid var(--primary);
  padding: 20px;
  box-shadow: var(--box-shadow);
  text-align: center;
  margin: 1rem auto;

  @media ${breakpoints.xs} {
    min-width: 80%;
  }

  @media ${breakpoints.sm} {
    min-width: 450px;
  }
`

type ProgressBarProps = {
  percentComplete: number
}

export const ProgressBar = styled.div<ProgressBarProps>`
  position: relative;
  width: 100%;
  height: 12px;
  background: var(--tertiary);
  border-radius: var(--roundness);
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
    border-radius: var(--roundness);
  }
`

export const QuestionText = styled.p`
  margin: 1rem 0;
  font-size: var(--font-size-xs);
  @media ${breakpoints.xs} {
    margin: 1.35rem 0;
  }
  @media ${breakpoints.sm} {
    margin: 1.75rem 0;
    font-size: var(--font-size-sm);
  }
  @media ${breakpoints.md} {
    font-size: var(--font-size-md);
  }
`

type ButtonWrapperProps = {
  correct: boolean
  userClicked: boolean
}

export const ButtonWrapper = styled.div<ButtonWrapperProps>`
  transition: opacity 0.23s ease;

  button {
    cursor: pointer;
    user-select: none;
    font-size: var(--font-size-xs);
    width: 100%;
    padding: 0.6rem;
    margin: 5px 0;
    background: ${({ correct, userClicked }) => (correct ? "linear-gradient(90deg, var(--green), var(--greenmuted))" : !correct && userClicked ? "linear-gradient(90deg, var(--red), var(--redmuted))" : "linear-gradient(90deg, var(--primary), var(--primary))")};
    border: var(--border-width) solid #fff;
    box-shadow: var(--box-shadow);
    border-radius: var(--roundness);
    color: #fff;
    text-shadow: 0px 1px 0px rgba(0, 0, 0, 0.25);

    @media ${breakpoints.sm} {
      font-size: var(--font-size-sm);
    }
    @media ${breakpoints.md} {
      font-size: var(--font-size-md);
    }

    :focus,
    :active {
      outline: none;
      border: 3px solid var(--cuatro);
    }
  }

  :hover {
    opacity: 0.9;
  }
`
