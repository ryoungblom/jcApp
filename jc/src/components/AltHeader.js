import { Link } from 'react-router-dom';

import { HeaderContainer, HeaderLogo } from '../styles/header';
import logo from '../images/logo.svg';

function AltHeader() {
  return (
    <HeaderContainer>
      <Link to="/">
        <h1> Company </h1>
        <p> by JC Telemedicine </p>
        {/*<Logo src={logo} alt="logo" />*/}
      </Link>
    </HeaderContainer>
  );
}

export default AltHeader;
