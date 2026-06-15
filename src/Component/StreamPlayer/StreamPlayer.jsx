import React, { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";
import "./StreamPlayer.css";
import { detectDeviceType } from "../../util/utils";
import { FaPlay } from "react-icons/fa";

export default function StreamPlayer({ streamingUrl }) {
  const path_image = import.meta.env.VITE_REACT_APP_ONESOURCE;
  const playerRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [playerKey, setPlayerKey] = useState(0);
  const [playerError, setPlayerError] = useState(false);
  const [showPlayer, setShowPlayer] = useState(true);
  const [volume, setVolume] = useState(1);

  const handlePlayerError = (e) => {
    console.error("ReactPlayer Error:", e);
    setPlayerError(true);
  };

  useEffect(() => {
    let interval;
    if (playerError && streamingUrl) {
      interval = setInterval(async () => {
        try {
          const res = await fetch(streamingUrl, {
            method: "GET",
            headers: {
              "Cache-Control": "no-cache",
              Pragma: "no-cache",
            },
          });

          if (res.status === 200) {
            setPlayerError(false);
            setShowPlayer(false);
            setTimeout(() => {
              setPlayerKey((prev) => prev + 1);
              setShowPlayer(true);
            }, 300);
          }
        } catch (err) {
          console.log("Still offline...");
        }
      }, 2000);
    }

    return () => clearInterval(interval);
  }, [playerError, streamingUrl]);

  const handlePlayPause = () => {
    setPlaying(!playing);
  };

  const handleOnStart = () => {
    setPlaying(true);
  };

  // Handle volume change from native controls
  const handleVolumeChange = (e) => {
    setVolume(e.target.volume);
  };

    useEffect(() => {

setTimeout(() => {
    if (playerRef?.current) {
      console.log(playerRef ,"playerRef.current ")
      const videoEl = playerRef?.current;
      console.log("videoEl",videoEl)
      if (videoEl) {
        videoEl.disablePictureInPicture = true;
        videoEl.setAttribute("disablePictureInPicture", "true");
      }
    }
}, 1000);
  }, [playing, playerKey, showPlayer]);

  return (
    <div className="video-container">
      {playerError ? (
        <div className="stream-offline">
          <div className="stream-offline-inset">
            <img src={path_image + "video-warn.png"} alt="" />
            <p>Stream Offline</p>
          </div>
        </div>
      ) : (
        <>
          {showPlayer && (
            <ReactPlayer
              key={playerKey}
              ref={playerRef}
              src={streamingUrl}
              onStart={handleOnStart}
              volume={volume}
              onVolumeChange={handleVolumeChange}
              controls={true}
              width="100%"
              height="100%"
              onError={handlePlayerError}
              config={{
                file: {
                  attributes: {
                    controlsList: "nodownload noplaybackrate nofullscreen",
                    disablePictureInPicture: true,
                    playsInline: true,
                    allowFullScreen: true,
                  },
                },
              }}
              allowFullScreen
            />
          )}
        </>
      )}
      {!playing && detectDeviceType() === "Desktop" && (
        <div className="play-button" onClick={handlePlayPause}>
          <FaPlay size={50} />
        </div>
      )}
    </div>
  );
}