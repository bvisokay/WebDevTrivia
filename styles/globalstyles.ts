import { createGlobalStyle } from "styled-components"
import { breakpoints } from "../styles/breakpoints"

export const GlobalStyles = createGlobalStyle`


* {
  box-sizing: border-box;
  font-family: monospace, sans-serif;  
}

html {
  scroll-behavior: smooth;
}

:root {
  --primary: #5661ff; /* (86, 97, 255) */
  --secondary: #374147; /* orig 041e42 */
  --tertiary: #869397; /* (27, 38, 44) */
  --cuatro: #0085a3;
  --green: #56ffa4;
  --greenmuted: #59bc86;
  --red: #ff5656;
  --redmuted: #d94141;
  --transparent-light: rgba(0,0,0,0);
  --transparent-dark: rgba(0,0,0,.4);
  --wrapper-width: 1015px;
  --wrapper-width-narrow: 400px;
  --font-primary: monospace, sans-serif;
  --font-secondary: 'Bebas Neue',  sans-serif;
}

  body[data-theme="light"] {
    --color-text-primary: var(--primary);
    --color-text-secondary: var(--secondary);
    --color-bg-primary: #fff;
    --color-bg-secondary: #fff;
    --color-bg-toggle: var(--primary);
  }
  
  body[data-theme="dark"] {
    --color-text-primary: #fff;
    --color-text-secondary: #e3e3e3;
    --color-bg-primary: #15232d;
    --color-bg-secondary: var(--secondary);
    --color-bg-toggle: var(--tertiary);
  }
  
  body {
    //background-image: url("Sprinkle.svg");
    //background-image: url("sebastian-unrau-unsplash.jpg");
    //background-image: url("polygon-luminary-bg-jar.svg");
    //background-size: cover;
    //background-repeat: no-repeat;
    background-color: var(--color-bg-primary);
    color: var(--color-text-primary);
    margin: 0;
    padding: 0;
  }

/*   body::after {
    content: "";
    background: rgba(0,0,0,.4);
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: -2;
  } */
  
  h1,h2,h3,h4,h5,h6 {
    font-family: var(--font-secondary);
    margin: 0;
    padding: 0;
  }
  
  h1 {
    font-size: 1rem;

    @media ${breakpoints.xs} {
      font-size: 2rem;
    }
    @media ${breakpoints.sm} {
      font-size: 2.75rem;
    }
  }

  h2 {
    letter-spacing: 1.5px;
    font-size: 1.35rem;

    @media ${breakpoints.xs} {
      font-size: 1.5rem;
    }
    @media ${breakpoints.sm} {
      letter-spacing: 2px;
      font-size: 2rem;
    }
  }


  p {
    font-size: 0.7rem;
    @media ${breakpoints.sm} {
      font-size: .8rem;
    }
  }

  ul{
    margin-block-start: 0;
    margin-block-end: 0;
    padding-inline-start: 0;
  }
  
  li{
    list-style: none;
  }
  
  a {
    text-decoration: none;
    :hover {
      text-decoration: none;
    }

    :visited {
      color: var(--color-text-primary);
      text-decoration: underline;
    }
  }
`
