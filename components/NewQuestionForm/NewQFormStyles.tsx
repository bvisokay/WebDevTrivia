import styled from "styled-components"

export const Wrapper = styled.section`
  //border: 1px solid aqua;
  margin: 2rem auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .form-control {
    margin: 0.5rem 0;
  }

  label,
  input {
    display: block;
    width: 100%;
    min-width: 300px;
  }

  label {
    font-size: 0.8rem;
    padding-bottom: 0.25rem;
  }

  input {
    padding: 0.5rem;
  }

  textarea {
    resize: none;
  }
`
