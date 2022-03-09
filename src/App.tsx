import { useState, useEffect } from "react";
import { IAgoraRTCRemoteUser } from "agora-rtc-react";
import { Wrapper, Container } from "./style";
import { useClient, useMicrophoneAndCameraTracks } from "./config";
import VideoController from "./components/Controller";
import VideoList from "./components/VideoGrid";

const agoraAppId = import.meta.env.VITE_AGORA_APP_ID;
const uuid = "test";
const agoraToken = null;

function App() {
  const [users, setUsers] = useState<IAgoraRTCRemoteUser[]>([]);
  const [start, setStart] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const client = useClient();
  const { ready, tracks } = useMicrophoneAndCameraTracks();

  useEffect(() => {
    const init = async () => {
      client.on("user-published", async (user, mediaType) => {
        await client.subscribe(user, mediaType);
        console.log("subscribe success");
        if (mediaType === "video") {
          setUsers((prevUsers) => [...new Set([...prevUsers, user])]);
        }
        if (mediaType === "audio") {
          user.audioTrack?.play();
        }
      });

      client.on("user-joined", (user) => {
        setUsers((prevUsers) => [...new Set([...prevUsers, user])]);
      });

      client.on("user-unpublished", (user, type) => {
        console.log("unpublished", user, type);
        if (type === "audio") {
          user.audioTrack?.stop();
        }
        if (type === "video") {
          user.videoTrack?.stop();
        }
      });

      client.on("user-left", (user) => {
        console.log("leaving", user);
        setUsers((prevUsers) => {
          return prevUsers.filter((User) => User.uid !== user.uid);
        });
      });

      await client.join(
        agoraAppId,
        uuid,
        agoraToken,
        encodeURI(String(Math.random()))
      );
      if (tracks) {
        await client.publish([tracks[0], tracks[1]]);
        await tracks[1].setEnabled(false);
        await tracks[0].setEnabled(false);
      }
      setIsLoading(false);
      setStart(true);
    };

    if (ready && tracks) {
      console.log("init ready");
      init();
    }
  }, [uuid, agoraAppId, agoraToken, client, ready, tracks]);

  return (
    <Wrapper>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          <Container>
            {start && tracks && <VideoList users={users} tracks={tracks} />}
            {ready && tracks && (
              <VideoController
                tracks={tracks}
                setStart={setStart}
                uuid={uuid}
              />
            )}
          </Container>
        </>
      )}
    </Wrapper>
  );
}

const styles = {
  container: {
    width: "100vw",
    height: "100vh",
    display: "flex",
    flex: 1,
    backgroundColor: "#007bff22",
  },
  heading: { textAlign: "center" as const, marginBottom: 0 },
  videoContainer: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
  } as React.CSSProperties,
  nav: { display: "flex", justifyContent: "space-around" },
  btn: {
    backgroundColor: "#007bff",
    cursor: "pointer",
    borderRadius: 5,
    padding: 5,
    color: "#ffffff",
    fontSize: 20,
  },
};

export default App;
