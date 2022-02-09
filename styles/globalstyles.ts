import { createGlobalStyle } from "styled-components"
import { breakpoints } from "../styles/breakpoints"

export const GlobalStyles = createGlobalStyle`

:root {
  --primary: #003594;
  --secondary: #869397;
  --tertiary: #041E42;
  --cuatro: #0085a3;
  --wrapper-width: 1015px;
  --wrapper-width-narrow: 400px;
  --font-primary: monospace, sans-serif;
  --font-secondary: "Fascinate Inline", Arial, Helvetica, sans-serif;
  --font-tertiary: "Bungee", sans-serif;
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
    background-image: linear-gradient(180deg, aqua, var(--primary));
    background-size: 100%;
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    -moz-background-clip: text;
    -moz-text-fill-color: transparent;
    filter: drop-shadow(2px 2px var(--secondary));
    //filter: drop-shadow(2px 2px #0085a3);
    font-size: 1rem;
    font-weight: 400;
    text-align: center;
    margin: 20px 0 0 0;
    line-height: 1;
    padding-bottom: 1rem;

    @media ${breakpoints.xs} {
      font-size: 2rem;
    }
    @media ${breakpoints.sm} {
      font-size: 2.75rem;
    }
  }

  h2,h3,h4,h5,h6,button {
    font-family: "Bungee", sans-serif;
  }

  p {
    font-size: 0.7rem;

    @media ${breakpoints.sm} {
      font-size: .8rem;
    }

    
  }

  a {
    text-decoration: none;
  }

  ul{
    margin-block-start: 0;
    margin-block-end: 0;
    padding-inline-start: 0;
  }

  li{
    list-style: none;
  }

  li.dotted {
    margin: .1rem 0 .1rem 1rem;
    list-style-type: square;
    color: var(--primary);
    padding: 0;
    font-size: 0.7rem;

@media ${breakpoints.sm} {
  font-size: .8rem;
}

  }


  hr {
    border-top: none;
    border-left: none;
    border-right: none;
    border-bottom: 3px solid var(--primary);
    color: orangered;
    border-radius: 8px;
  }

  label,
  input {
    display: block;
    width: 100%;

    @media ${breakpoints.sm} {
      min-width: 300px;
    }
  }

  label {
    font-size: 0.8rem;
    padding-bottom: 0.25rem;
  }

  input {
    padding: 0.5rem;
  }

  .modal {
  //box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
  border-radius: 6px;
  background-color: white;
  padding: .5rem;
  text-align: center;
  z-index: 10;
  position: fixed;
  top: 1rem;
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




  .score,
  .number,
  .loading
   {
    text-transform: uppercase;
    font-family: "Bungee", sans-serif;
    font-size: 1rem;
    margin: -0.5rem 0 0.5rem 0;
    padding: 0;
    color: var(--primary);
    text-align: center;
  }


  .btn-container {
    //border: 1px solid hotpink;
    margin: 0 auto;
    display: flex;
    justify-content: center;
  }

  .start,
  .next,
  .options,
  .login,
  .toggle,
  .addQSubmit, .supportSubmit, .changePW {
    cursor: pointer;
    background: linear-gradient(180deg, #fff, #ffcc91);
    border: 2px solid #d38558;
    box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.25);
    border-radius: 10px;
    height: 40px;
    margin: 20px 4px;
    padding: 0 20px;
    min-width: 100px;
    color: orangered;
    font-size: .5rem;

    @media ${breakpoints.xs} {
      font-size: .8rem;
    }
  }

  .next {
    display: block;
    margin: 2rem auto;
    text-align: center;

  }

  .start {
    max-width: 200px;
  }

  .categoryList, .questionList {
    display: block;
    margin: 0 auto 3rem auto;
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
  top: -.2rem;
  position: absolute;
  z-index: 1;
  padding-top: 7px;
  padding-bottom: 16px;
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
