import styled from "styled-components"

export const LoadingErrorBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 1rem;
  cursor: pointer;
  user-select: none;
  font-size: 1rem;
  margin: 5px 0;
  background: linear-gradient(90deg, #ff5656, crimson);
  border: var(--border-width) solid #fff;
  box-shadow: var(--box-shadow);
  border-radius: var(--roundness);
  color: #fff;
  text-shadow: 0px 1px 0px rgba(0, 0, 0, 0.25);

  p {
    color: var(--color-text-primary);
  }
`

const LoadingError: React.FC = () => {
  return (
    <LoadingErrorBox>
      <p>Sorry there was an error. Please try again later...</p>
    </LoadingErrorBox>
  )
}

export default LoadingError
