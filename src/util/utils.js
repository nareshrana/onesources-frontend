import { ENDPOINT } from "../axios/apiConfig"
import { postData } from "../axios/apiHelper"
const authEndpoint = "https://webinarback.shinedezign.pro/";

const speed = async () => {
  const userImageLink =
    "https://docintel.app/Pizigani_1367_Chart_10MB.jpg" +
    "?n=" +
    Math.random();

  let time_start, end_time;
  const downloadImgSrc = new Image();

  const loadImage = () => {
    return new Promise((resolve, reject) => {
      downloadImgSrc.onload = function () {
        end_time = new Date().getTime();
        resolve();
      };

      downloadImgSrc.onerror = function () {
        // reject(new Error("Error loading image"));
        reject("Error loading image");
      };

      time_start = new Date().getTime();
      downloadImgSrc.src = userImageLink;
    });
  };

  try {
    await loadImage();
    const speedInMbps = displaySpeed();
    localStorage.setItem("speed", speedInMbps);
    return speedInMbps;
  } catch (error) {
    console.error(error.message);
    throw error;
  }

  function displaySpeed() {
    const timeDuration = (end_time - time_start) / 1000;
    const imageSizeInBits = downloadImgSrc.width * downloadImgSrc.height;
    const bps = (imageSizeInBits / timeDuration).toFixed(2);
    const speedInKbps = (bps / 1024).toFixed(2);
    const speedInMbps = (speedInKbps / 1024).toFixed(2);
    return speedInMbps;
  }
};

const delayedFunction = async () => {
  const getlocalspeed = localStorage.getItem("speed");
  let eventKey = Object.keys(localStorage).find((key) =>
    key.startsWith("event_")
  );

  if (typeof eventKey === "undefined") {
    setTimeout(delayedFunction, 3000);
  }

  let eventId = null;
  if (eventKey) {
    eventId = eventKey.split("_")[1];
  }

  if (!getlocalspeed) {
    const getSpeed = await speed();
    let obj = {
      user_id: localStorage.getItem("un"),
      eventId: parseInt(eventId),
      speed: getSpeed,
    };
    postData(`${ENDPOINT.STORE_FIREBASE}`, obj);
  }
};

const getSignature = async (meetingNumber, role) => {
  try {
    const req = await fetch(authEndpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        meetingNumber: meetingNumber,
        role: role,
      }),
    });
    const res = await req.json();
    const signature = res.signature;
    return signature;
  } catch (e) {
  }
};
export function generateUUID() {
  let dt = new Date().getTime();
  const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (dt + Math.random() * 16) % 16 | 0;
    dt = Math.floor(dt / 16);
    return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
  });
  return uuid;
}
const loader = (data) => {
  if (data == "show") {
    const element = document.getElementById("custom_loader");

    element?.classList?.add("show");
  } else {
    const element = document.getElementById("custom_loader");
    element?.classList?.remove("show");
  }
};

const fetchIPAddress = async () => {
  const storedIp = localStorage.getItem("ip");
  if (storedIp) {
    return storedIp
  } else {
    try {
      const response = await fetch("https://api.ipify.org?format=json");
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("ip", data.ip);
        return data.ip
      } else {
        throw new Error("Failed to fetch IP address");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch IP address.");
      return "0.0.0.0";
    }
  }
};
const scrollToSection = (sectionId) => {
  if (sectionId == null) {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  } else {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth",
    });
  }
};
function hideLoader(data) {
  
  if(data?.loader==false){
    const loader = document.getElementById("customLoader");
    if (loader) loader?.classList.add("hide");
  }else{
    const interval = setInterval(() => {
      const meetingElement = document.querySelector("#meeting-app");
      const loader = document.getElementById("customLoader");
      if (meetingElement) {
        clearInterval(interval);
        if (data.isInWaitingRoom) {
          meetingElement.style.opacity = 0;
          if (loader) loader?.classList.remove("hide");
        } else {
          meetingElement.style.opacity = 1;
          if (loader) loader?.classList.add("hide");
        }
      }
    }, 100);
  }
  
}

function detectDeviceType() {
  const userAgent = navigator.userAgent || navigator.vendor || window.opera;

  if (/Windows/.test(userAgent) && /Touch/.test(userAgent)) {
      return "Windows Tablet";
  }
  if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
      return "iOS Device";
  }

  if (/Android/.test(userAgent)) {
      if (/Mobile/.test(userAgent)) {
          return "Android Mobile";
      }
      return "Android Tablet";
  }

  if (/Tablet|iPad/.test(userAgent)) {
      return "Tablet";
  }
  if (/Mobile|Android/.test(userAgent)) {
      return "Mobile";
  }
  return "Desktop";
}


function stopAllPlayingVideos() {
  const videos = document.querySelectorAll('video');
  const stoppedVideos = [];

  videos.forEach((video) => {
    if (!video.paused && !video.ended && video.readyState > 2) {
      video.pause();             // pause it
      video.currentTime = 0;     // reset playback to start
      stoppedVideos.push(video);
    }
  });

  return stoppedVideos;
}

export { speed, delayedFunction, getSignature, loader, fetchIPAddress, scrollToSection,hideLoader,detectDeviceType,stopAllPlayingVideos }