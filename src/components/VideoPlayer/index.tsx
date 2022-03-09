import { useState, useRef } from "react";
import {
  IRemoteVideoTrack,
  IRemoteAudioTrack,
  IMicrophoneAudioTrack,
  ICameraVideoTrack,
  AgoraVideoPlayer,
} from "agora-rtc-react";
import { VideoWrap, VolumeVisualizer } from "./style";

interface VideoCardProps {
  videoTrack: ICameraVideoTrack | IRemoteVideoTrack | undefined;
  audioTrack: IMicrophoneAudioTrack | IRemoteAudioTrack | undefined;
}

interface DivWithFullscreen extends HTMLDivElement {
  msRequestFullscreen?: () => void;
  mozRequestFullScreen?: () => void;
  webkitRequestFullscreen?: () => void;
}

const VideoCard = ({ videoTrack, audioTrack }: VideoCardProps): JSX.Element => {
  const [isSpeak, setIsSpeak] = useState(false);
  const videoRef = useRef<DivWithFullscreen>(null);

  function openFullscreen() {
    if (videoRef.current) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      } else if (videoRef.current.mozRequestFullScreen) {
        /* Firefox */
        videoRef.current.mozRequestFullScreen();
      } else if (videoRef.current.webkitRequestFullscreen) {
        /* Chrome, Safari & Opera */
        videoRef.current.webkitRequestFullscreen();
      } else if (videoRef.current.msRequestFullscreen) {
        /* IE/Edge */
        videoRef.current.msRequestFullscreen();
      }
    }
  }

  return (
    <VideoWrap onDoubleClick={() => openFullscreen()} ref={videoRef}>
      {videoTrack && (
        <AgoraVideoPlayer
          style={{ height: "100%", width: "100%" }}
          className="video"
          videoTrack={videoTrack}
        />
      )}
      {isSpeak && <VolumeVisualizer />}
    </VideoWrap>
  );
};

export default VideoCard;
