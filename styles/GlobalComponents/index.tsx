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
  padding: 1rem;
  margin: 0 auto;
  width: 100%;
  max-width: var(--wrapper-width);
  //border: 3px solid var(--tertiary);
`

export const SectionNarrow = styled.section`
  padding: 1rem;
  margin: 0 auto;
  width: 100%;
  max-width: var(--wrapper-width-narrow);
  //border: 3px solid var(--tertiary);
`

export const SectionTitle = styled.h2`
  font-weight: 700;
  margin-bottom: 16px;
  color: var(--primary);
`

export const SectionText = styled.p`
  font-size: 1rem;
  line-height: 2rem;
  padding: 1rem 0;
`

export const SectionDivider = styled.div`
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
  border-radius: 0.25rem;
  margin: 0.2rem auto;
  padding: 0.2rem 0.25rem;
  color: var(--primary);
  font-weight: bold;

  input {
    border: 2px solid var(--secondary);
    border-radius: 0.25rem;
    display: block;
    min-width: 30px;
  }

  textarea {
    width: 100%;
    border: 2px solid var(--secondary);
    border-radius: 0.25rem;
    line-height: 1.75;
    padding: 0.25rem;
  }

  select {
    width: 100%;
    padding: 0.5rem 0;
    border: 2px solid var(--secondary);
    border-radius: 0.25rem;
  }
`
