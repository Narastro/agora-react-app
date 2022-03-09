import styled from "styled-components";
import { VIDEO_BOX } from "../../constants/const";

export const VideoWrap = styled.div`
  display: flex;
  justify-contents: center;
  align-items: center;
  width: ${VIDEO_BOX.width};
  height: ${VIDEO_BOX.height};
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  border-radius: ${VIDEO_BOX.borderRadius};
  overflow: hidden;
  position: relative;
`;

export const VolumeVisualizer = styled.div`
  width: ${VIDEO_BOX.width};
  height: ${VIDEO_BOX.height};
  position: absolute;
  right: 0;
  border: 3px solid blue;
  border-radius: ${VIDEO_BOX.borderRadius};
`;
