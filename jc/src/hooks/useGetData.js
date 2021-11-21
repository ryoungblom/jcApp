import React from "react";
import { fbApp } from '../adapters/firebase';
import { useAuth } from '../contexts/AuthContext';

export const useGetData = () => {
  const { currentUser } = useAuth();
  const [documents, setDocuments] = React.useState([]);
  const db = fbApp.firestore();
  React.useEffect(() => {
    console.log("Requesting User:")
    console.log(currentUser.uid)
    db.collection("users")
      .doc(currentUser.uid).get()
        .then(snapshot => {
          let arr = [];
          const userData = snapshot.data();
          arr.push({ userData })
          console.log(arr);
          setDocuments(arr);
      });
  }, [db]);
  return [documents];
};
