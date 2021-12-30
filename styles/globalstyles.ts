import { createGlobalStyle } from "styled-components"
import { breakpoints } from "../styles/breakpoints"

export const GlobalStyles = createGlobalStyle`

:root {
  --primary: #003594;
  --secondary: #869397;
  --tertiary: #041E42;
  --wrapper-width: 1015px;
}

  * {
    box-sizing: border-box;
    font-family: monospace, sans-serif;  
  }

  html {
    scroll-behavior: smooth;
  }

  body {
    background: whitesmoke;
    margin: 0;
    padding: 0;
  }

  h1 {
    font-family: "Fascinate Inline", Arial, Helvetica, sans-serif;
    background-image: linear-gradient(180deg, #fff, #87f1ff);
    background-size: 100%;
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    -moz-background-clip: text;
    -moz-text-fill-color: transparent;
    filter: drop-shadow(2px 2px #0085a3);
    font-size: 2.75rem;
    font-weight: 400;
    text-align: center;
    margin: 20px;
    line-height: 1;

    @media ${breakpoints.xs} {
      font-size: 3.75rem;
    }
    @media ${breakpoints.sm} {
      font-size: 4.375rem;
    }
  }

  h2,h3,h4,h5,h6,button {
    font-family: "Bungee", sans-serif;
  }
  a {
    text-decoration: none;
  }
  li{
    list-style: none;
  }

  .loading {
    color: #fff;
  }

  .score,
  .number,
  .loading {
    text-transform: uppercase;
    font-family: "Bungee", sans-serif;
    font-size: 1rem;
    margin: -0.5rem 0 0.5rem 0;
    //border: 1px solid blueviolet;
    padding: 0 0 0 0;
  }

  .btn-container {
    margin: 0 auto;
  }

  .start,
  .next,
  .options {
    cursor: pointer;
    background: linear-gradient(180deg, #fff, #ffcc91);
    border: 2px solid #d38558;
    box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.25);
    border-radius: 10px;
    height: 40px;
    margin: 20px 4px;
    padding: 0 20px;
    min-width: 100px;
  }

  .next {
    margin-top: -1rem;
  }

  .start {
    max-width: 200px;
  }

`
