import { createGlobalStyle } from "styled-components"

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

  h1,h2,h3,h4,h5,h6,button {
    font-family: "Bungee", sans-serif;
  }
  a {
    text-decoration: none;
  }
  li{
    list-style: none;
  }

`
