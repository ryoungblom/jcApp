import styled, { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
  }

  html {
    -webkit-font-smoothing: antialiased;
  }

  body {
    box-sizing: border-box;
    width: 100vw;
    font-family: "HelveticaNeue-Light", "Helvetica Neue Light", "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif;
    font-weight: 300;
    {/*background: #FAFAFA;*/}
    background: #262626;
    color: #FAFAFA;
    overflow-x: hidden;
    font-family: 'Montserrat', sans-serif;

    a {
      color: inherit;
      text-decoration: none;
    }

    @media (max-width: 450px) {
      {/*background: #fafafa;*/}
      background: #262626;
    }

  }

`;



export const ParentContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  box-sizing: border-box;
  position: relative;
`;


export default GlobalStyle;
