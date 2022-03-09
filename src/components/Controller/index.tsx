import React, { useState, useCallback } from "react";
import {
  FaMicrophone,
  FaMicrophoneSlash,
  FaVideo,
  FaVideoSlash,
} from "react-icons/fa";
import { MdOutlineExitToApp } from "react-icons/md";
import { ICameraVideoTrack, IMicrophoneAudioTrack } from "agora-rtc-react";
import { ButtonContainer, Controls } from "./style";
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
  const [trackState, setTrackState] = useState({ video: false, audio: false });

  const mute = async (type: "audio" | "video") => {
    if (type === "audio") {
      await tracks[0].setEnabled(!trackState.audio);
      setTrackState((ps) => {
        return { ...ps, audio: !ps.audio };
      });
    } else if (type === "video") {
      await tracks[1].setEnabled(!trackState.video);
      setTrackState((ps) => {
        return { ...ps, video: !ps.video };
      });
      if (trackState.video) await client.publish(tracks[1]);
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
        <button onClick={() => mute("audio")}>
          {trackState.audio ? <FaMicrophone /> : <FaMicrophoneSlash />}
        </button>
        <button onClick={() => mute("video")}>
          {trackState.video ? <FaVideo /> : <FaVideoSlash />}
        </button>
        <button onClick={() => leaveChannel()}>
          <MdOutlineExitToApp />
        </button>
      </Controls>
    </ButtonContainer>
  );
};

export default VideoController;