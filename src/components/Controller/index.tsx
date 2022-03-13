import React, { useCallback } from "react";
import { useStore } from "../../stores/useStore";
import {
  FaMicrophone,
  FaMicrophoneSlash,
  FaVideo,
  FaVideoSlash,
} from "react-icons/fa";
import { MdOutlineExitToApp } from "react-icons/md";
import { ICameraVideoTrack, IMicrophoneAudioTrack } from "agora-rtc-react";
import { ButtonContainer, Controls, Btn } from "./style";
import { useClient } from "../../config";

interface VideoControllerProps {
  tracks: [IMicrophoneAudioTrack, ICameraVideoTrack];
  setStart: React.Dispatch<React.SetStateAction<boolean>>;
  uuid: string;
}

const VideoController = ({
  tracks,
  setStart,
  uuid,
}: VideoControllerProps): JSX.Element => {
  const client = useClient();
  const { audio, video, toggleVideo, toggleAudio } = useStore();

  const mute = async (type: "audio" | "video") => {
    if (type === "audio") {
      await tracks[0].setEnabled(!audio);
      toggleAudio();
    } else if (type === "video") {
      await tracks[1].setEnabled(!video);
      toggleVideo();
      if (video) await client.publish(tracks[1]);
    }
  };

  const leaveChannel = useCallback(async () => {
    await client.leave();
    client.removeAllListeners();
    tracks[0].close();
    tracks[1].close();
    setStart(false);
  }, [client, tracks, uuid, setStart]);

  return (
    <ButtonContainer>
      <Controls>
        <Btn onClick={() => mute("audio")}>
          {audio ? <FaMicrophone /> : <FaMicrophoneSlash />}
        </Btn>
        <Btn onClick={() => mute("video")}>
          {video ? <FaVideo /> : <FaVideoSlash />}
        </Btn>
        <Btn onClick={() => leaveChannel()}>
          <MdOutlineExitToApp />
        </Btn>
      </Controls>
    </ButtonContainer>
  );
};

export default VideoController;
