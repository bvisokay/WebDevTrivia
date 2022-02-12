import styled from "styled-components"
import { breakpoints } from "../breakpoints"

export const Wrapper = styled.div`
  max-width: var(--wrapper-width);
  margin: 0 auto;
`
export const WideWrapper = styled.div`
  max-width: var(--wrapper-width);
  margin: 0 auto;
`

export const Section = styled.section`
  padding: 0 1rem;
  margin: 0 auto;
  width: 100%;
  max-width: var(--wrapper-width);
  //border: 3px solid var(--tertiary);
`

export const SectionNarrow = styled.section`
  padding: 0 1rem;
  margin: 0 auto;
  width: 100%;
  max-width: var(--wrapper-width-narrow);
  //border: 3px solid var(--tertiary);
`
export const PageTitle = styled.h2`
  font-weight: 700;
  margin-bottom: 16px;
  color: var(--primary);
`

export const SectionTitle = styled.h2`
  font-weight: 700;
  margin: 0.5rem 0;
  color: var(--primary);
  text-align: center;
`
export const SectionTitle2 = styled.h4`
  color: #fff;
  font-family: var(--font-primary) sans-serif;
  padding: 0;
  margin: 0;
`
export const SectionText = styled.p`
  font-size: 1rem;
  line-height: 1;
  padding: 0;
`

export const SectionDivider = styled.div`
  margin: 0.25rem auto 2rem auto;
  width: 64px;
  height: 6px;
  border-radius: 10px;
  background-color: #fff;
  background: linear-gradient(270deg, var(--secondary) 0%, var(--primary) 100%);
`

export const ListItem = styled.div`
  color: var(--primary);
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
  margin: 0.5rem 0;
  padding: 0 0.5rem;
  border-radius: 10px;
  font-weight: 700;
`

export const QuestionCardEl = styled.div`
  font-size: 0.75rem;
  font-family: arial, sans-serif;
  color: var(--primary);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  margin: 1rem 0;
  padding: 0.5rem;
`

export const QuestionCardRow = styled.div`
  color: var(--primary);
  display: flex;
  flex-direction: column;
  //align-items: center;
  justify-content: space-between;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  margin: 0.25rem 0;
  padding: 0.25rem;

  @media ${breakpoints.sm} {
    flex-direction: row;
  }
`

export const FormControl = styled.div`
  //border: 1px solid var(--secondary);
  border-radius: 0.5rem;
  margin: 0.5rem auto;
  padding: 0.35rem 0.25rem;
  color: var(--primary);
  font-weight: bold;
  position: relative;
  z-index: 2;

  input {
    padding: 0.6rem 0.5rem;
  }

  label {
    font-size: 1rem;
    padding: 0;
  }

  textarea {
    line-height: 1.75;
    resize: none;
  }

  select {
    padding: 0.75rem 0;
  }

  input,
  textarea,
  select {
    margin-top: 0.5rem;
    min-width: 275px;
    width: 100%;
    position: relative;
    z-index: 2;
    border-radius: 0.5rem;
    border: 2px solid var(--secondary);
    :focus {
      outline: 1px solid var(--secondary);
    }
    :active {
      outline: 1px solid var(--secondary);
    }
  }
`
export const TitleArea = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: var(--primary);
  padding: 0.75rem;
  border-radius: 10px;
  margin: 0 0 0.75rem 0;

  a {
    color: #fff;
    font-weight: 700;
    font-size: 1.75rem;
  }
`
