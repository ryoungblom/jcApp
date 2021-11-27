import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { IoHomeOutline } from 'react-icons/io5';
import { BsFileEarmarkMedical } from 'react-icons/bs';
import { IoHelpBuoy } from 'react-icons/io5';
import { IoHeartOutline } from 'react-icons/io5';
import { CgProfile } from 'react-icons/cg';
import { IoBookmarkOutline } from 'react-icons/io5';
import { RiSettings3Line } from 'react-icons/ri';
import { AiOutlineSearch } from 'react-icons/ai';
import { MdCancel } from 'react-icons/md';

import { useAuth } from '../contexts/AuthContext';

import logo from '../images/logo.svg';
import blankProfile from '../images/BlankImage.jpg';

import {
  HeaderContainer,
  HeaderLogo,
  SearchFieldContainer,
  HeaderIcons,
  HeaderProfileImage,
  DropdownMenu,
  DropdownItem,
  DropdownText,
  HeaderProfileContainer,
  Triangle,
  SearchField,
  SearchIconContainer,
  CancelIconContainer,
  LogoutLink,
} from '../styles/header';

function Header() {
  const [showDrawer, setShowDrawer] = useState(false);

  const history = useHistory();

  const adjustSettings = () =>{
    let path = "/accounts/settings";
    history.push(path);
  }

  const { signout } = useAuth();

  const handleSignout = () => {
    signout();
    setShowDrawer((prev) => !prev);
    history.push('/accounts/signin');
  };

  return (
    <HeaderContainer>
      <Link to="/">
        <h1> Company </h1>
        <p> by JC Telemedicine </p>
        {/*<Logo src={logo} alt="logo" />*/}
      </Link>

      <SearchFieldContainer>
        <SearchField placeholder="Search" />

        <SearchIconContainer>
          <AiOutlineSearch color="#dbdbdb" fontSize="1rem" />
        </SearchIconContainer>

        <CancelIconContainer>
          <MdCancel cursor="pointer" color="#dbdbdb" fontSize="1rem" />
        </CancelIconContainer>
      </SearchFieldContainer>
      <HeaderIcons>
        <IoHomeOutline fontSize="1.5rem" cursor="pointer" />
        <BsFileEarmarkMedical fontSize="1.5rem" cursor="pointer" />
        <IoHelpBuoy fontSize="1.5rem" cursor="pointer" />
        <IoHeartOutline fontSize="1.5rem" cursor="pointer" />
        <HeaderProfileContainer
          clicked={showDrawer}
          onClick={() => setShowDrawer((prev) => !prev)}
        >
          <HeaderProfileImage src={blankProfile} alt="profile" />
        </HeaderProfileContainer>

        <DropdownMenu show={showDrawer}>
          <Triangle />
          <DropdownItem>
            <CgProfile fontSize="1.2rem" />
            <DropdownText>Profile</DropdownText>
          </DropdownItem>
          <DropdownItem>
            <IoBookmarkOutline fontSize="1.2rem" />
            <DropdownText>Orders</DropdownText>
          </DropdownItem>
          <DropdownItem>
            <RiSettings3Line fontSize="1.2rem" />
            <DropdownText onClick={adjustSettings}>Settings</DropdownText>
          </DropdownItem>
          <LogoutLink onClick={handleSignout}>
            <DropdownText>Logout</DropdownText>
          </LogoutLink>
        </DropdownMenu>
      </HeaderIcons>
    </HeaderContainer>
  );
}

export default Header;
