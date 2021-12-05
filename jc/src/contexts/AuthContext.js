import { useContext, useState, useEffect, createContext } from 'react';
import { useHistory } from "react-router-dom";
import { fbApp } from '../adapters/firebase';
import firebase from 'firebase';
import moment from 'react-moment';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

function varEmailAlert() {
  alert("Please verify your email address before continuing!")
  window.location.reload(false);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  const googleProvider = new firebase.auth.GoogleAuthProvider()

  const signInWithGoogle = () => {
    let promise = new Promise(function (resolve, reject) {

    firebase.auth().signInWithPopup(googleProvider).then((res) => {
      console.log("USER:::")
      console.log(res.user)

      const googleUserID = res.user.uid

      res.user.emailVerified ? console.log("yes") : console.log("no");

      const userSubmittedName = "Rod Smith Jello Turtle"//res.user.displayName

      //var [first, ...second] = userSubmittedName.split(" ")
      //second = second.join(" ")

      const oneName = userSubmittedName.split(/\s(.+)/)[0];  //everything before the first space
      const twoName = userSubmittedName.split(/\s(.+)/)[1];  //everything after the first space

      var firstName = oneName
      var lastName = twoName

      console.log("User Login Attempt: ", googleUserID);

      var docRef = fbApp.firestore().collection('users').doc(googleUserID);

      docRef.get().then((doc) => {
          if (doc.exists) {
              console.log("Existing user!")
              console.log("Document data:", doc.data())
              resolve(res);
          } else {
              // doc.data() will be undefined in this case
              console.log("No such document!");
              fbApp.firestore().collection('users').doc(googleUserID).set({
                firstName: firstName,
                lastName: lastName,
                email: res.user.email,
                orders: 0,
              }).then((res => {
                resolve(res);
              }))
          }
      }).catch((error) => {
          console.log("Error getting document:", error);
      });

    }).catch((error) => {
      console.log(error.message)
    })
  });

  return promise;
}

  const signup = (email, password, firstName, lastName) => {
    let promise = new Promise(function (resolve, reject) {
      fbApp.auth()
        .createUserWithEmailAndPassword(email, password)
        .then((ref) => {

          const fullNameCat = (firstName + " " + lastName)

          ref.user.updateProfile({
            displayName: fullNameCat,
          });

          console.log("Created User ID: ", ref.user.uid);
          ref.user.sendEmailVerification();

          fbApp.firestore().collection('users').doc(ref.user.uid).set({
            firstName: firstName,
            lastName: lastName,
            email: email,
            orders: 0,
          }).then((ref => {
            fbApp.auth().signOut()
            alert("Please check your email and confirm your email address!")
            resolve(ref);
          }))

        })
        .catch((error) => reject(error));
    });

    return promise;
  };

  const updateImage = (image) => {
    let promise = new Promise(function (resolve, reject) {
      fbApp.auth().then((ref) => {
        ref.user.updateProfile({
            photoURL: image,
          });

          fbApp.firestore().collection('users').doc(ref.user.uid).set({
            profileURL: image,
          }).then((ref => {resolve(ref);}));

          console.log("Updated User Photo: ", ref.user.uid);

        })
        .catch((error) => reject(error));
      });
    return promise;
  };




  const history = useHistory();

  function routeChange() {
    let path = "/";
    history.push(path);
    varEmailAlert();
  }


  function isNotSignedIn() {
    console.log("Email not verified!")
    fbApp.auth().signOut()
    routeChange()
  }


  const signin = (email, password) => {
    let promise = new Promise(function (resolve, reject) {

      fbApp.auth()
        .signInWithEmailAndPassword(email, password)
        .then((ref) => {

          let user = fbApp.auth().currentUser;

          console.log(user)

          user.emailVerified ? resolve(ref) : isNotSignedIn();
          //console.log("Logged In:")
          //console.log(ref.user.uid)
          //resolve(ref);

        })
        .catch((error) => {
          reject(error);
        });


    });

    return promise;
  };

  const signout = () => {
    return fbApp.auth().signOut();
  };

  const passwordReset = (email) => {
    let promise = new Promise(function (resolve, reject) {
      fbApp.auth()
        .sendPasswordResetEmail(email)
        .then(() => {
          resolve(`Password Reset Email sent to ${email}`);
        })
        .catch((error) => {
          reject(error);
        });
    });

    return promise;
  };

  useEffect(() => {
    const unsubscribe = fbApp.auth().onAuthStateChanged((user) => {
      console.log(user);
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, [currentUser]);

  const value = {
    signInWithGoogle,
    currentUser,
    signup,
    updateImage,
    signin,
    signout,
    passwordReset,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
