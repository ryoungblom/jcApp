import { useContext, useState, useEffect, createContext } from 'react';

import { fbApp } from '../adapters/firebase';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

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

          fbApp.firestore().collection('users').doc(ref.user.uid).set({
            firstName: firstName,
            lastName: lastName,
            email: email,
            orders: 0,
          }).then((ref => {resolve(ref);}))

        })
        .catch((error) => reject(error));
    });

    return promise;
  };

  const updateImage = (image) => {
    let promise = new Promise(function (resolve, reject) {
      fbApp.auth().then((ref) => {
        console.log("IN UPDATE********")
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



  const signin = (email, password) => {
    let promise = new Promise(function (resolve, reject) {
      fbApp.auth()
        .signInWithEmailAndPassword(email, password)
        .then((ref) => {
          console.log("Logged In:")
          console.log(ref.user.uid)
          resolve(ref);
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
