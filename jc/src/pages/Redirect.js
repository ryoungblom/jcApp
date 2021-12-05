import { Redirect } from 'react-router-dom';

import Header from '../components/Header';
import ProfileBanner from '../components/ProfileBanner';
import ProfilePost from '../components/ProfilePost';

import { ProfileContainer } from '../styles/profile';

import useSendScript from '../hooks/useSendScript';

import { useAuth } from '../contexts/AuthContext';

function Redirecting () {
  const { currentUser } = useAuth();

  const { returnData } = useSendScript("https://run.mocky.io/v3/79dced6c-bb1a-4e56-8f9b-b600dff7f75c")
  console.log (returnData)

  return (
    <>
    {currentUser ? (
      <ProfileContainer>
        <Header />
        <ProfileBanner />
        <ProfilePost />
        <div>
        {returnData && (
              <div className="text-white">
                  <h1> "hello" </h1>
              </div>
          )
        }
        </div>
      </ProfileContainer>
    ) : (
      <Redirect to="/accounts/signin" />
    )}
    </>
  );
}

export default Redirecting;
