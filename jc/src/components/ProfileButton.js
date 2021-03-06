import React from 'react';
import { useHistory } from "react-router-dom";


function ProfileButton() {

  const history = useHistory();

  const routeChange = () =>{
    let path = "/";
    history.push(path);
  }

  return (

    <button color="primary" className="typeformButton"
      onClick={routeChange}>
        Back to Profile
    </button>
  )
}

export default ProfileButton;
