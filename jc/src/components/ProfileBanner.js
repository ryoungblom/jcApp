import { RiSettings3Line } from 'react-icons/ri';

import { useAuth } from '../contexts/AuthContext';
import Intake from '../components/Intake';

import {
  BannerContainer,
  ProfileImage,
  ProfileDetails,
  ProfileMeta,
  Activity,
  DisplayName,
  EditButton,
  Username,
  ActivityNumber,
  ActivityText,
} from '../styles/profile';

import blankProfile from '../images/BlankImage.jpg';

function ProfileBanner() {
  const { currentUser } = useAuth();

  return (
    <BannerContainer>
      <ProfileImage src={blankProfile} alt="profile" />
      <ProfileDetails>
        <ProfileMeta>
          <Username>{currentUser.displayName}</Username>
          <EditButton>View Orders</EditButton>
          <RiSettings3Line cursor="pointer" fontSize="1.5rem" />
        </ProfileMeta>
        <Activity>
          <ActivityText>
            <ActivityNumber>0</ActivityNumber> pending
          </ActivityText>
          <ActivityText>
            <ActivityNumber>26</ActivityNumber> orders
          </ActivityText>
          <ActivityText>
            <ActivityNumber>2</ActivityNumber> companies
          </ActivityText>
        </Activity>
        {/* <DisplayName>Moses Ogbopina</DisplayName> */}
      </ProfileDetails>
      <Intake />
    </BannerContainer>
  );
}

export default ProfileBanner;
