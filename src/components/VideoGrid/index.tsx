import {
  IAgoraRTCRemoteUser,
  IMicrophoneAudioTrack,
  ICameraVideoTrack,
} from "agora-rtc-react";
import {
  VideosContainer,
  VideosGrid,
  VideoCardWrapper,
  UserInfoDiv,
} from "./style";
import VideoPlayer from "../VideoPlayer";

interface VideosProps {
  users: IAgoraRTCRemoteUser[];
  tracks: [IMicrophoneAudioTrack, ICameraVideoTrack];
}

const Videos = ({ users, tracks }: VideosProps): JSX.Element => {
  const myVideoTrack = tracks[1];
  const myAudioTrack = tracks[0];

  return (
    <VideosContainer>
      <VideosGrid id="videos">
        <VideoCardWrapper>
          <VideoPlayer videoTrack={myVideoTrack} audioTrack={myAudioTrack} />
          <UserInfoDiv>(나)</UserInfoDiv>
        </VideoCardWrapper>
        {users.length > 0 &&
          users.map((user) => (
            <VideoCardWrapper key={user.uid}>
              <VideoPlayer
                videoTrack={user.videoTrack}
                audioTrack={user.audioTrack}
              />
              <UserInfoDiv>{decodeURI(String(user.uid))}</UserInfoDiv>
            </VideoCardWrapper>
          ))}
      </VideosGrid>
    </VideosContainer>
  );
};

export default Videos;
