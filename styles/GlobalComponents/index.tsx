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
`
type SectionProps = { dark?: boolean }
export const SectionNarrow = styled.section<SectionProps>`
  padding: 0.5rem;
  margin: 0.5rem auto;
  width: 100%;
  max-width: var(--wrapper-width-narrow);
  //background: var(--transparent-dark);
  border-radius: 10px;
  //background-color: ${props => (props.dark ? "var(--primary)" : "white")};
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
  font-size: 1.875rem;
  letter-spacing: 1.25px;
  font-weight: 700;
  margin: 0.5rem 0;
  color: ${props => (props.dark ? "var(--primary)" : "white")};
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
  font-size: 0.775rem;
  line-height: 1;
  color: cornflowerblue;

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
  width: 64px;
  height: 6px;
  border-radius: 10px;
  background-color: #fff;
  background: linear-gradient(270deg, var(--primary) 0%, var(--primary) 100%);
`

export const ListItem = styled.div`
  background: var(--transparent-dark);
  color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
  margin: 0.5rem 0;
  padding: 0 0.5rem;
  border-radius: 10px;
  font-weight: 700;
  //border: 1px solid var(--primary);
`

export const LiveValidateMessage = styled.div`
  background-color: orangered;
  font-size: 0.75rem;
  top: 0.1rem;
  position: absolute;
  z-index: 1;
  padding-top: 7px;
  padding-bottom: 5px;
  padding-left: 0.8rem;
  padding-right: 0.8rem;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  border-bottom-left-radius: 10px;
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
  color: white;
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
  border-radius: 0.5rem;
  margin: 0.5rem auto;
  padding: 0.35rem 0.25rem;
  color: ${props => (props.light ? "white" : "var(--primary)")};
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
    padding: 0.5rem 0.25rem;
    margin-top: 0.1rem;
    width: 98%;
    position: relative;
    z-index: 2;
    border-radius: 0.65rem;
    border: 2px solid var(--primary);

    @media ${breakpoints.xs} {
      margin-top: 0.3rem;
    }

    @media ${breakpoints.sm} {
      padding: 0.5rem 0.25rem;
      margin-top: 0.5rem;
    }
  }
`
export const TitleArea = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: var(--secondary);
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
