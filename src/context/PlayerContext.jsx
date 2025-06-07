import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { spotifySongs } from "../assets/Assets";
import { useDB } from "./DBoperations";

const PlayerContext = createContext();
function PlayerContextProvider(props) {
  const { isLogin } = useDB();
  const audioRef = useRef();
  const barRef = useRef();
  const timebarRef = useRef();

  const [track, setTrack] = useState(spotifySongs[0]);

  const [playStatus, setplayStatus] = useState(false);
  const [time, setTime] = useState({
    currentTime: {
      second: 0,
      minute: 0,
    },
    totalTime: {
      second: 0,
      minute: 0,
    },
  });

  const play = () => {
    audioRef.current.play();
    setplayStatus(true);
  };

  const pause = () => {
    audioRef.current.pause();
    setplayStatus(false);
  };

  const playWithId = (id) => {
    if (!isLogin) return;
    const songitem = spotifySongs.find((s) => s.id === id);
    setTrack(songitem);
  };

  const nextSong = () => {
    setTrack((p) => {
      let index = spotifySongs.indexOf(p);
      if (index < spotifySongs.length - 1) {
        return spotifySongs[++index];
      }
      return p;
    });
  };

  const prevSong = () => {
    setTrack((p) => {
      let index = spotifySongs.indexOf(p);
      if (index > 0) {
        return spotifySongs[--index];
      }
      return p;
    });
  };

  const jumpTime = (e) => {
    const elmWidth = e.currentTarget.offsetWidth;
    const wheretoCLickX = e.nativeEvent.offsetX;
    const p = (wheretoCLickX / elmWidth) * audioRef.current.duration;
    audioRef.current.currentTime = p;
  };

  const hasMounted = useRef(false);

  useEffect(() => {
    if (hasMounted.current && isLogin) {
      setTime({
        currentTime: {
          second: 0,
          minute: 0,
        },
        totalTime: {
          second: 0,
          minute: 0,
        },
      });
      play();
    } else {
      hasMounted.current = true;
    }
  }, [track]);

  useEffect(() => {
    setTimeout(() => {
      if (!audioRef.current) return;

      audioRef.current.ontimeupdate = (e) => {
        setTime({
          currentTime: {
            second: Math.floor(audioRef.current.currentTime % 60),
            minute: Math.floor(audioRef.current.currentTime / 60),
          },
          totalTime: {
            second: Math.floor(audioRef.current.duration % 60),
            minute: Math.floor(audioRef.current.duration / 60),
          },
        });

        // timebar
        timebarRef.current.style.width =
          Math.floor(
            (audioRef.current.currentTime / audioRef.current.duration || 1) *
              100
          ) + "%";
        if (audioRef.current.currentTime === audioRef.current.duration) {
          nextSong();
        }
      };
    }, 1000);

    return () => {
      if (audioRef.current) {
        audioRef.current.ontimeupdate = null;
      }
    };
  }, [track]);

  const contextValue = {
    audioRef,
    barRef,
    timebarRef,
    track,
    setTrack,
    playStatus,
    setplayStatus,
    time,
    setTime,
    play,
    pause,
    nextSong,
    prevSong,
    jumpTime,
    playWithId,
  };

  return (
    <PlayerContext.Provider value={contextValue}>
      {props.children}
    </PlayerContext.Provider>
  );
}

export default PlayerContextProvider;
export const usePlayerContext = () => useContext(PlayerContext);
