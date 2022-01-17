import styled from "styled-components"

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
  color: var(--secondary);
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
