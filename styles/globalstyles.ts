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
  --primary: #5661ff; /* Was #1b262c */
  --secondary: #041E42;
  --tertiary: #869397; /* rgb(27,38,44) */
  --cuatro: #0085a3;
  --cinco: #5661ff;/* 86, 97, 255 */ /* Moved to primary, replace */
  --seis: #d38558;
  --green: #56ffa4;
  --greenmuted: #59bc86;
  --red: #ff5656;
  --redmuted: #d94141;
  --orangemuted: #ffcc91;
  --transparent-light: rgba(0,0,0,0);
  --transparent-dark: rgba(0,0,0,.4);
  --wrapper-width: 1015px;
  --wrapper-width-narrow: 400px;
  --font-primary: monospace, sans-serif;
  --font-secondary: 'Bebas Neue',  sans-serif;
}

  body[data-theme="light"] {
    --color-text-primary: var(--primary);
    /* --color-text-secondary: #27201a; */
    --color-text-secondary: var(--secondary);
    --color-bg-primary: #fff;
    --color-bg-toggle: var(--primary);
  }
  
  body[data-theme="dark"] {
    --color-text-primary: #fff;
    --color-text-secondary: #e3e3e3;
    /* --color-bg-primary: #15232d; */
    --color-bg-primary: var(--secondary);
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

  h1 {
    font-size: 1rem;

    @media ${breakpoints.xs} {
      font-size: 2rem;
    }
    @media ${breakpoints.sm} {
      font-size: 2.75rem;
    }
  }

  h1,h2,h3,h4,h5,h6,button {
    font-family: var(--font-secondary);
    margin: 0;
    padding: 0;
    //border: 1px solid hotpink;
  }

  p {
    font-size: 0.7rem;
    @media ${breakpoints.sm} {
      font-size: .8rem;
    }
  }

  /* Links */

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


  /* End Links */

  ul{
    margin-block-start: 0;
    margin-block-end: 0;
    padding-inline-start: 0;
  }

  li{
    list-style: none;
  }


  hr {
    border-top: none;
    border-left: none;
    border-right: none;
    border-bottom: 3px solid var(--primary);
    color: orangered;
    border-radius: 8px;
  }



  .modal {
  //box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
  border-radius: 6px;
  background-color: white;
  padding: .5rem;
  text-align: center;
  z-index: 10;
  position: fixed;
  /* top: 1rem; */
  min-width: 260px;
  left: calc(50% - 130px);
  font-size: 0.6rem;
  max-width: 90%;
  margin: 0 auto;
  
  @media ${breakpoints.xs} {
  position: fixed;
  font-size: 0.8rem;
  width: 20rem;
  left: calc(50% - 10rem);
  }

  @media ${breakpoints.sm} {
  position: fixed;
  font-size: 0.9rem;
  width: 26rem;
  left: calc(50% - 13rem);
  }

  input, textarea, select, label {
    font-size: 0.6rem;
    @media ${breakpoints.xs} {
      font-size: 0.8rem;
    }
    @media ${breakpoints.sm} {
      font-size: 0.9rem;
    }
  }
  
}

  
  .login,
  .toggle,
  .addQSubmit {
    cursor: pointer;
    color: orangered;
    background: linear-gradient(180deg, #fff, crimson);
    border: 2px solid var(--primary);
    box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.25);
    border-radius: 10px;
    height: 40px;
    margin: 10px 4px;
    padding: 0 20px;
    min-width: 100px;
    font-size: .8rem;
    font-weight: 500;

    @media ${breakpoints.xs} {
      font-size: 1rem;
    }
  }




  .categoryList, .questionList {
    display: block;
    margin: 0 auto 0 auto;
    max-width: 400px;
    //border: 2px solid aqua;
    padding: 0;
  }

  .categoryItem, .questionItem {
    display: block;
    margin: 0 auto;
    width: 100%;
    padding: 1rem 0;
  }

  .liveValidateMessage {
  font-size: .75rem;
  top: .1rem;
  position: absolute;
  z-index: 1;
  padding-top: 7px;
  padding-bottom: 20px;
  padding-left: 0.8rem;
  padding-right: 0.8rem;
  background: #ffd7d4;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  color: crimson;
}

.liveValidateMessage--visible {
  opacity: 1;
  transform: translateY(0);
}

.liveValidateMessage-enter {
  opacity: 0;
  transform: translateY(100%);
}

.liveValidateMessage-enter-active {
  opacity: 1;
  transform: translateY(0);
  transition: 0.33s opacity ease-in-out, 0.33s transform ease-in-out;
}

.liveValidateMessage-exit {
  opacity: 1;
  transform: translateY(0);
}

.liveValidateMessage-exit-active {
  opacity: 0;
  transform: translateY(100%);
  transition: 0.33s opacity ease-in-out, 0.33s transform ease-in-out;
}

`
