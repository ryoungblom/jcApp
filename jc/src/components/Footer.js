// icons
import { MdKeyboardArrowDown } from 'react-icons/md';

// styles
import { FooterContainer, FooterRow, FooterLink } from '../styles/footer';

function Footer() {
  return (
    <FooterContainer>
      <FooterRow>
        <FooterLink>About</FooterLink>
        <FooterLink>Website</FooterLink>
        <FooterLink>Community</FooterLink>
        <FooterLink>Help</FooterLink>
        <FooterLink>API</FooterLink>
        <FooterLink>Privacy</FooterLink>
        <FooterLink>Terms & Conditiona</FooterLink>
      </FooterRow>
      <FooterRow>
        <FooterLink>
          {/*English <MdKeyboardArrowDown />*/}
          &copy;{new Date().getFullYear()}{' '}
          JC Telemedicine
        </FooterLink>
      </FooterRow>
    </FooterContainer>
  );
}

export default Footer;
