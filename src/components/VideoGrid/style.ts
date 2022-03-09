import styled from "styled-components";

export const VideosContainer = styled.div`
  display: flex;
  justify-contents: center;
  align-items: center;
  height: 100%;
`;

export const VideoCardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-contents: center;
  align-items: center;
`;

export const UserInfoDiv = styled.div`
  width: 100%;
  display: flex;
  justify-contents: center;
  align-items: center;
  margin-top: 10px;
  font-size: 16px;
`;

export const VideosGrid = styled.div`
  padding: 10px;
  display: grid;
  grid-template-columns: repeat(3, auto);
  gap: 2rem;
`;
