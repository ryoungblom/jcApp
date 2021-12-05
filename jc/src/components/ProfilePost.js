import { ProfilePostContainer, ProfilePostHeader, UserFeed } from '../styles/profile';
import YoutubeEmbed from './media/youtube/youtubeEmbed'
import TwitterEmbed from './media/youtube/twitter'
import TwitterEmbedTwo from './media/youtube/twitterTwo'
//import "../styles/media/youtubeStyle.css";
import "../styles/media/playerMaster.css";

function ProfilePost() {
  return (
    <ProfilePostContainer>
      <ProfilePostHeader>
        <h1> Your Feed </h1>
      </ProfilePostHeader>
      <UserFeed>
        <TwitterEmbed />
        <YoutubeEmbed embedId="RdwLAyWHBVs" />
        <TwitterEmbedTwo />
      </UserFeed>
    </ProfilePostContainer>
  );
}

export default ProfilePost;
