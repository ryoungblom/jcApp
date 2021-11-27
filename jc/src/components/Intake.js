import { PopupButton } from '@typeform/embed-react'
import { doc, getDoc } from "firebase/firestore";
import { useAuth } from '../contexts/AuthContext';
import { fbApp } from '../adapters/firebase';
import { useGetData } from "../hooks/useGetData";


function Intake() {

  const formID = {
    key: process.env.REACT_APP_INTAKE_FORM,
  };

  const { currentUser } = useAuth();

  var uid

  if (currentUser !== null) {
    // The user object has basic properties such as display name, email, etc.
    const displayName = currentUser.displayName;
    const email = currentUser.email;
    const photoURL = currentUser.photoURL;
    const emailVerified = currentUser.emailVerified;

    // The user's ID, unique to the Firebase project. Do NOT use
    // this value to authenticate with your backend server, if
    // you have one. Use User.getToken() instead.
    uid = currentUser.uid;
  }

  const [documents] = useGetData();

  var userName
  var userID = 0;
  var userEmail

  documents[0] ? userName = documents[0].userData.firstName : userName = "King"
  uid ? userID = uid : userID = 0
  documents[0] ? userEmail = documents[0].userData.email : userEmail = "null@jctelemedicine.com"

  return (
    <PopupButton id={`${formID.key}`} style={{ fontSize: 20 }}
      hidden = {{
        username: userName,
        userid: 0,
        useremail: userEmail
      }}
      className="typeformButton">
      Create New Order
    </PopupButton>
  )
}

export default Intake;
