import React, { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";
import { FaPlay } from "react-icons/fa";
import { detectDeviceType } from "../../util/utils";
import { postData } from "../../axios/apiHelper";
import { ENDPOINT } from "../../axios/apiConfig";
import "./StreamPlayer.css";

export default function StreamPlayerWithTracking({ streamingUrl }) {
  const playerRef = useRef(null);
  const eventId = localStorage.getItem("evd");
  const [isPlaying, setIsPlaying] = useState(false);
  const [playerError, setPlayerError] = useState(false);
  const [reloadKey, setReloadKey] = useState(0);
  const [visiblePlayer, setVisiblePlayer] = useState(true);
  const [currentPlaybackTime, setCurrentPlaybackTime] = useState(0);
  const [sessionTrackingId, setSessionTrackingId] = useState("");
  const desktopType = detectDeviceType();

  const retryVideoLoad = async () => {
    try {
      const response = await fetch(streamingUrl, {
        method: "GET",
        headers: {
          "Cache-Control": "no-cache",
          Pragma: "no-cache",
        },
      });
      if (response.status === 200) {
        setPlayerError(false);
        setVisiblePlayer(false);
        setTimeout(() => {
          setReloadKey((prev) => prev + 1);
          setVisiblePlayer(true);
        }, 300);
      }
    } catch {}
  };

  useEffect(() => {
    let interval;
    if (playerError && streamingUrl) {
      interval = setInterval(retryVideoLoad, 2000);
    }
    return () => clearInterval(interval);
  }, [playerError, streamingUrl]);

  const formatTime = (seconds) => {
    const pad = (val) => String(val).padStart(2, "0");
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    return `${pad(hrs)}:${pad(mins)}:${pad(secs)}`;
  };

  const handlePlayPause = () => {
    try {
      if (!isPlaying) {
        playerRef.current.getInternalPlayer().play();
      } else {
        playerRef.current.getInternalPlayer().pause();
      }
    } catch (err) {
      if (!isPlaying) {
        playerRef.current.play();
      } else {
        playerRef.current.pause();
      }
    }
    setIsPlaying(!isPlaying);
  };

  const handlePlayerError = () => {
    setPlayerError(true);
  };

  const handlePlaybackStart = () => {
    setIsPlaying(true);
  };

  const handleProgressUpdate = (progress) => {
    const currentTime = formatTime(progress?.target?.currentTime ||0);
    setCurrentPlaybackTime(currentTime);
  };

  const handleVideoPlay = async () => {
    setIsPlaying(true);
    const payload = {
      event_id: eventId,
      video_start_time:
        currentPlaybackTime != 0 ? currentPlaybackTime : "00:00:00",
      action: "preview video played",
      timeline_action: "Started preview video",
      device_type: desktopType,
    };
    const result = await postData(ENDPOINT.PREVIEW_VIDEO_TRACKING, payload);
    setSessionTrackingId(result.data.id || "");
  };

  const handleVideoPause = async () => {
    if (!sessionTrackingId) return;

    await postData(ENDPOINT.PREVIEW_VIDEO_TRACKING, {
      id: sessionTrackingId,
      video_end_time:
        currentPlaybackTime != 0 ? currentPlaybackTime : "00:00:00",
      action: "Paused preview video",
      timeline_action: "Paused preview video",
      device_type: desktopType,
    });
    setSessionTrackingId("");
    setIsPlaying(false);
  };

  const handleVideoEnd = () => {
    if (!sessionTrackingId) return;
    postData(ENDPOINT.PREVIEW_VIDEO_TRACKING, {
      id: sessionTrackingId,
      video_end_time:
        currentPlaybackTime != 0 ? currentPlaybackTime : "00:00:00",
      action: "Completed preview video",
      timeline_action: "Completed preview video",
      device_type: desktopType,
    });
    setSessionTrackingId("");
    setIsPlaying(false);
     if (playerRef.current) {
      playerRef.current.currentTime = 0;
    }
  };

  return (
    <div className="video-container">
      {playerError ? (
        <div className="stream-offline">
          <div className="stream-offline-inset">
            <img
              src={`${import.meta.env.VITE_REACT_APP_ONESOURCE}video-warn.png`}
              alt="Stream Offline"
            />
            <p>Stream Offline</p>
          </div>
        </div>
      ) : (
        // https://docintel.app/img/octa/e-templates/octapharma/ISTH2025-Introduction-poster-img.jpg
        visiblePlayer && (
          <ReactPlayer
            key={reloadKey}
            ref={playerRef}
            src={streamingUrl}
            loop
            controls
            width="100%"
            height="100%"
            onError={handlePlayerError}
            onTimeUpdate={handleProgressUpdate}
            onPlay={handleVideoPlay}
            onPause={handleVideoPause}
            onEnded={handleVideoEnd}
            onStart={handlePlaybackStart}
            config={{
              file: {
                attributes: {
                  controlsList: "nodownload noplaybackrate",
                  disablePictureInPicture: true,
                  playsInline: true,
                  allow: "autoplay; fullscreen; picture-in-picture",
                  allowFullScreen: true,
                },
              },
            }}
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
          />
        )
      )}
      {!isPlaying && desktopType === "Desktop" && (
        <div className="play-button" onClick={handlePlayPause}>
          <FaPlay size={50} />
        </div>
      )}
    </div>
  );
}
