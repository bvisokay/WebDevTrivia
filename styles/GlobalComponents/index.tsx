import styled from "styled-components"
import { breakpoints } from "../breakpoints"

type FormControlProps = {
  light?: boolean
}

export const FormControl = styled.div<FormControlProps>`
  border-radius: var(--roundness);
  margin: 0.5rem auto;
  padding: 0.35rem 0.25rem;
  color: var(--color-text-primary);
  font-weight: bold;
  position: relative;
  z-index: 2;

  label {
    font-size: 1rem;
    padding: 0;
    display: flex;
    align-items: center;

    &.split {
      justify-content: space-between;
    }
  }

  textarea {
    line-height: 1.75;
    resize: none;
  }

  input,
  textarea,
  select {
    color: var(--color-text-primary);
    background-color: var(--color-bg-primary);
    padding: 0.5rem 0.25rem;
    margin-top: 0.1rem;
    width: 98%;
    position: relative;
    z-index: 2;
    border-radius: var(--roundness);
    border: var(--border-width) solid var(--primary);

    @media ${breakpoints.xs} {
      margin-top: 0.3rem;
    }

    @media ${breakpoints.sm} {
      padding: 0.5rem 0.25rem;
      margin-top: 0.5rem;
    }

    :hover {
      opacity: 0.9;
      border: var(--border-width) solid var(--cuatro);
    }

    /* Focusing the button with a keyboard */
    :focus-visible {
      border: 0;
      outline: var(--border-width) solid var(--cuatro);
    }
  }

  option {
    text-align: center;
    min-height: 2rem;
    border: var(--border-width) solid aqua;
    padding: 0.8rem 0;
  }

  input:autofill {
    background-color: hotpink;
  }
`

export const CX_IconDiv = styled.button`
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  color: var(--text-color);
  cursor: pointer;
  font-size: 1.5rem;
  //line-height: 2rem;
  margin: 0;
  position: relative;
  text-align: center;
  text-transform: uppercase;
  //vertical-align: middle;
  white-space: nowrap;

  @media ${breakpoints.sm} {
    //border: 1px solid aqua;
  }

  @media ${breakpoints.md} {
    //border: 1px solid hotpink;
  }

  &:focus {
    outline-offset: 2px;
  }
  &:focus:not(:focus-visible) {
    outline: none;
  }
`

export const ListItem = styled.div`
  background-color: var(--color-bg-secondary);
  color: var(--color-text-secondary);
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: var(--box-shadow);
  margin: 0.5rem 0;
  padding: 0 0.5rem;
  border-radius: var(--roundness);
  font-weight: 700;
  //border: 1px solid var(--primary);
`

export const LiveValidateMessage = styled.div`
  color: white;
  background-color: orangered;
  font-size: 0.75rem;
  top: 6px;
  position: absolute;
  z-index: 1;
  padding-top: 7px;
  padding-bottom: 5px;
  padding-left: 0.8rem;
  padding-right: 0.8rem;
  border-top-left-radius: var(--roundness);
  border-top-right-radius: var(--roundness);
  border-bottom-left-radius: var(--roundness);
`

export const Modal = styled.div`
  border-radius: var(--roundness);
  background-color: var(--color-bg-secondary);
  padding: 0.5rem;
  text-align: center;
  z-index: 10;
  position: fixed;
  top: 1rem;
  min-width: 260px;
  left: calc(50% - 130px);
  font-size: 0.6rem;
  max-width: 90%;
  margin: 0 auto;

  @media ${breakpoints.xs} {
    position: fixed;
    font-size: 0.8rem;
    width: 20rem;
    left: calc(50% - 10rem);
  }
  @media ${breakpoints.sm} {
    position: fixed;
    font-size: 0.9rem;
    width: 26rem;
    left: calc(50% - 13rem);
  }

  input,
  textarea,
  select,
  label {
    font-size: 0.6rem;
    @media ${breakpoints.xs} {
      font-size: 0.8rem;
    }
    @media ${breakpoints.sm} {
      font-size: 0.9rem;
    }
  }
`

export const Section = styled.section`
  padding: 0 1rem;
  margin: 0.5rem auto;
  width: 100%;
  max-width: var(--wrapper-width);
  border-radius: var(--roundness);
`
type SectionProps = { dark?: boolean }
export const SectionNarrow = styled.section<SectionProps>`
  padding: 0.5rem;
  margin: 0.5rem auto;
  width: 100%;
  max-width: var(--wrapper-width-narrow);
  border-radius: var(--roundness);
  background-color: var(--color-bg-tertiary);
  //border: 2px solid var(--primary);
`

export const PageTitle = styled.h2`
  font-weight: 700;
  margin-bottom: 16px;
  color: var(--primary);
  color: var(--color-text-primary);
`

type SectionTitleProps = {
  dark?: boolean
}

export const SectionTitle = styled.h2<SectionTitleProps>`
  font-size: 1.875rem;
  letter-spacing: 1.25px;
  font-weight: 700;
  margin: 0.5rem 0;
  color: var(--color-text-primary);
  text-align: center;
`

export const SectionTitle2 = styled.h4`
  color: var(--color-text-primary);
  font-family: var(--font-primary);
  padding: 0;
  margin: 0;
  color: var(--color-text-primary);
`
export const SectionText = styled.p`
  font-size: 0.775rem;
  line-height: 1;
  color: var(--color-text-primary);

  @media ${breakpoints.xs} {
    font-size: 0.9rem;
  }
  @media ${breakpoints.md} {
    font-size: 1rem;
    line-height: 1.25;
  }
`

export const SectionDivider = styled.div`
  margin: 0.25rem auto 2rem auto;
  width: 96px;
  height: 3px;
  border-radius: var(--roundness);
  background-color: var(--color-text-primary);
  background: linear-gradient(270deg, var(--primary) 0%, var(--green) 100%);
`

export const TitleArea = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: var(--color-bg-primary);
  padding: 0.75rem;
  border-radius: var(--roundness);
  margin: 0 0 0.75rem 0;
  font-size: 1rem;
  box-shadow: var(--box-shadow);

  @media ${breakpoints.xs} {
    font-size: 1rem;
  }
  @media ${breakpoints.sm} {
    font-size: 1.25rem;
  }

  a {
    color: var(--color-text-primary);
    font-weight: 700;
    display: flex;
    font-size: 1rem;

    @media ${breakpoints.xs} {
      font-size: 1.5rem;
    }
    @media ${breakpoints.sm} {
      font-size: 2rem;
    }

    svg {
      //border: 1px solid hotpink;
      border-radius: var(--roundness);
    }
  }
`

export const QuestionCardEl = styled.div`
  font-size: 0.75rem;
  font-family: var(--font-primary);
  color: var(--primary);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  box-shadow: var(--box-shadow);
  border-radius: var(--roundness);
  margin: 1rem 0;
  padding: 0.5rem;
`

export const QuestionCardRow = styled.div`
  background-color: var(--color-bg-secondary);
  color: var(--color-text-secondary);
  display: flex;
  flex-direction: column;
  //align-items: center;
  justify-content: space-between;
  box-shadow: var(--box-shadow);
  border-radius: var(--roundness);
  margin: 0.75rem 0;
  padding: 0.25rem 0.5rem 0.75rem 0.5rem;

  @media ${breakpoints.xs} {
    flex-direction: row;
    padding: 0.5rem 1rem 0.5rem 1rem;
  }

  p {
    //border: 1px solid red;

    @media ${breakpoints.xs} {
      padding-right: 0.8rem;
    }
  }
`

export const Wrapper = styled.div`
  max-width: var(--wrapper-width);
  margin: 0 auto;
`
export const WideWrapper = styled.div`
  max-width: var(--wrapper-width);
  margin: 0 auto;
`
