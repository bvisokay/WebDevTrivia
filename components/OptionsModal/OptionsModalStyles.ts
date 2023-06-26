import styled from "styled-components"

export const BackDrop = styled.div`
  height: 100vh;
  width: 100vw;
  background: rgba(0, 0, 0, 0.75);
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`
export const SettingsPanel = styled.div`
  min-height: 300px;
  width: 85%;
  max-width: 400px;
  border-radius: var(--roundness);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 1rem;
  max-width: 400px;
  background-color: var(--color-bg-primary);
  color: var(--color-text-primary);

  form {
    width: 100%;
  }

  label {
    display: block;
    text-align: center;
    width: 100%;
  }

  select {
    width: 100%;
    padding: 10px 0;
    border: 2px solid var(--tertiary);
    box-shadow: var(--box-shadow);
    border-radius: var(--roundness);
    margin-bottom: 1rem;
  }

  .btn-container {
    display: flex;
    justify-content: center;
    margin: 1rem 0;
  }
`
