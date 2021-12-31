import styled from "styled-components"

export const Wrapper = styled.section`
  //border: 1px solid var(--primary);
  display: flex;
  flex-direction: column;
  align-items: center;

  .formControl {
    //border: 1px solid aqua;
    margin: 1rem auto;
  }

  label {
    //border: 1px solid hotpink;
    display: block;
    width: 100%;
    padding: 1rem 0.5rem;
    font-size: 1rem;
    color: var(--primary);
    font-weight: 700;
  }

  input {
    border: 1px solid var(--primary);
    display: block;
    width: 100%;
    padding: 1rem 0.5rem;
    font-size: 1rem;
    border-radius: 0.25rem;
  }
`
