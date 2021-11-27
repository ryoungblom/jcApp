import { Redirect } from 'react-router-dom';

import Header from '../components/Header';
import SettingModule from '../components/Settings';
import ProfilePost from '../components/ProfilePost';

import { ProfileContainer } from '../styles/profile';

import { useAuth } from '../contexts/AuthContext';

function Settings() {
  const { currentUser } = useAuth();

  return (
    <>
      {currentUser ? (
        <ProfileContainer>
          <Header />
          <SettingModule />
          <ProfilePost />
        </ProfileContainer>
      ) : (
        <Redirect to="/accounts/signin" />
      )}
    </>
  );
}

export default Settings;
