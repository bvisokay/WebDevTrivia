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
  margin: 0.5rem auto;
  width: 100%;
  max-width: var(--wrapper-width);
  //border: 3px solid var(--tertiary);
`

export const SectionNarrow = styled.section`
  padding: 0.5rem;
  margin: 0.5rem auto;
  width: 100%;
  max-width: var(--wrapper-width-narrow);
  //border: 3px solid var(--tertiary);
  //background: var(--transparent-dark);
  border-radius: 10px;
`
export const PageTitle = styled.h2`
  font-weight: 700;
  margin-bottom: 16px;
  color: var(--primary);
  color: #fff;
`

type SectionTitleProps = {
  dark?: boolean
}

export const SectionTitle = styled.h2<SectionTitleProps>`
  font-weight: 700;
  margin: 0.5rem 0;
  color: ${props => (props.dark ? "var(--primary)" : "var(--white)")};
  text-align: center;
`

export const SectionTitle2 = styled.h4`
  color: #fff;
  font-family: var(--font-primary);
  padding: 0;
  margin: 0;
  color: #fff;
`
export const SectionText = styled.p`
  font-size: 1rem;
  line-height: 1.25;
  color: #fff;
`

export const SectionDivider = styled.div`
  margin: 0.25rem auto 2rem auto;
  width: 64px;
  height: 6px;
  border-radius: 10px;
  background-color: #fff;
  background: linear-gradient(270deg, var(--primary) 0%, var(--cinco) 100%);
`

export const ListItem = styled.div`
  color: var(--white);
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
  margin: 0.5rem 0;
  padding: 0 0.5rem;
  border-radius: 10px;
  font-weight: 700;
  //border: 1px solid var(--cinco);
`

export const QuestionCardEl = styled.div`
  font-size: 0.75rem;
  font-family: var(--font-primary);
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
  background: var(--transparent-dark);
  color: var(--white);
  display: flex;
  flex-direction: column;
  //align-items: center;
  justify-content: space-between;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
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

type FormControlProps = {
  light?: boolean
}

export const FormControl = styled.div<FormControlProps>`
  //border: 1px solid var(--secondary);
  border-radius: 0.5rem;
  margin: 0.5rem auto;
  padding: 0.35rem 0.25rem;
  color: ${props => (props.light ? "var(--white)" : "var(--primary)")};
  font-weight: bold;
  position: relative;
  z-index: 2;

  label {
    font-size: 1rem;
    padding: 0;
  }

  textarea {
    line-height: 1.75;
    resize: none;
  }

  input,
  textarea,
  select {
    padding: 0.1rem 0.2rem;
    margin-top: 0.1rem;
    width: 98%;
    position: relative;
    z-index: 2;
    border-radius: 0.25rem;
    border: 2px solid var(--secondary);

    @media ${breakpoints.xs} {
      padding: 0.15rem 0.25rem;
      //border: 2px solid crimson;
      margin-top: 0.3rem;
    }

    @media ${breakpoints.sm} {
      padding: 0.25rem 0.5rem;
      border-radius: 0.5rem;
      margin-top: 0.5rem;
      //border: 2px solid hotpink;
    }

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
  font-size: 1rem;

  @media ${breakpoints.xs} {
    font-size: 1rem;
  }
  @media ${breakpoints.sm} {
    font-size: 1.25rem;
  }

  a {
    color: #fff;
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
      border-radius: 6px;
    }
  }
`
