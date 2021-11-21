import { RiSettings3Line } from 'react-icons/ri';
import { doc, getDoc } from "firebase/firestore";
import { useAuth } from '../contexts/AuthContext';
import { fbApp } from '../adapters/firebase';
import Intake from '../components/Intake';
import { useGetData } from "../hooks/useGetData";

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

  if (currentUser !== null) {
    // The user object has basic properties such as display name, email, etc.
    const displayName = currentUser.displayName;
    const email = currentUser.email;
    const photoURL = currentUser.photoURL;
    const emailVerified = currentUser.emailVerified;

    // The user's ID, unique to the Firebase project. Do NOT use
    // this value to authenticate with your backend server, if
    // you have one. Use User.getToken() instead.
    const uid = currentUser.uid;
  }

  const [documents] = useGetData();

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
            <ActivityNumber>
            {documents[0] ? documents[0].userData.orders : "0"}
            {/*documents[0].userData.orders*/}
            </ActivityNumber> orders
          </ActivityText>
          <ActivityText>
            <ActivityNumber>2</ActivityNumber> companies
          </ActivityText>
        </Activity>
        {/* <DisplayName> Name </DisplayName> */}
      </ProfileDetails>
      <Intake />
    </BannerContainer>
  );
}

export default ProfileBanner;
