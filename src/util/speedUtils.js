// speedUtils.js
export const speed = async () => {
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
          console.error("Error loading image");
        };
  
        time_start = new Date().getTime();
        downloadImgSrc.src = userImageLink;
      });
    };
  
    try {
      await loadImage();
      const speedInMbps = displaySpeed();
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
  