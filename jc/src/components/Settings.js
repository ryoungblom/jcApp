import { RiSettings3Line } from 'react-icons/ri';
import { doc, getDoc } from "firebase/firestore";
import { useAuth } from '../contexts/AuthContext';
import { updateProfile } from "firebase/auth";
import { fbApp } from '../adapters/firebase';
import ProfileButton from '../components/ProfileButton';
import { useGetData } from "../hooks/useGetData";
import { useHistory } from 'react-router-dom';

import {
  BannerContainer,
  ProfileColumnFlex,
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

import {useState, useRef} from 'react';
import storage from '../adapters/fbStorage';



function SettingModule() {

  var uid
  var photoURL
  const { currentUser } = useAuth();
  const { updateImage } = useAuth();

  if (currentUser !== null) {
    // The user object has basic properties such as display name, email, etc.
    const displayName = currentUser.displayName;
    const email = currentUser.email;
    photoURL = currentUser.photoURL;
    const emailVerified = currentUser.emailVerified;

    // The user's ID, unique to the Firebase project. Do NOT use
    // this value to authenticate with your backend server, if
    // you have one. Use User.getToken() instead.
    uid = currentUser.uid;
  }

  var userID = 0;
  uid ? userID = uid : userID = 0

  var userPFP = blankProfile;
  photoURL ? userPFP = photoURL : userPFP = blankProfile

  const [image , setImage] = useState('');
  const [loading, setLoading] = useState('');
  const [error, setError] = useState('');
  const [url, setUrl] = useState('');

  const upload = (e)=>{
    e.preventDefault();
    if(image == null)
      return;
      setUrl("Getting Download Link...")
    storage.ref(`/company/user/` + userID + `/profile/${image.name}`).put(image)
    .on("state_changed", alert("success"), alert, () => {
        // Getting Download Link
        storage.ref("/company/user/" + userID + "/profile").child(image.name).getDownloadURL()
          .then((url) => {
            setUrl(url);
            currentUser.updateProfile({
              photoURL: url
            }).then(() => {
              console.log("Profile Updated!")
              console.log(url)
              setLoading(false);
            }).catch((error) => {
              console.log ("Error Updating Profile!")
            });
          })
      });


  }

  const history = useHistory();

  const updateImageX = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    updateImage(image)
      .then((ref) => {
        setLoading(false);
        history.push('/');
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  };


  const [documents] = useGetData();

  return (
    <BannerContainer>
      <ProfileColumnFlex>
        <ProfileImage src={userPFP} alt="profile" />
        <input style={{margin: "5px"}} type="file" onChange={(e)=>{setImage(e.target.files[0])}}/>
        <button style={{width: "70%"}} className="typeformButton" onClick={(e) => upload(e)}>Upload</button>
      </ProfileColumnFlex>
      <ProfileDetails>
        <ProfileMeta>
          <Username>{currentUser.displayName}</Username>
          <EditButton>Update Data</EditButton>
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
      <ProfileButton />
    </BannerContainer>
  );
}

export default SettingModule;
