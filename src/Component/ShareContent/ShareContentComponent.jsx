import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { postData } from "../../axios/apiHelper";
import { ENDPOINT } from "../../axios/apiConfig";
import { loader } from "../CommonComponent/Loader";

const ShareContentComponent = () => {
  const { urlParam } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    loader("show");
    (async () => {
      if (urlParam) {
        try {
          const itemLength = urlParam.split("_").length;
          if (itemLength === 3) {
            const data = await postData(`${ENDPOINT.QRCODE_LINK_VALIDATION}`, {
              qrCodeToken: urlParam,
            });

            if (!data?.data?.status) {
              if (data?.data?.type === "1") {
                navigate("/invalidOrExpire/invalid");
              } else {
                navigate("/invalidOrExpire/expire");
              }
            } else {
              navigate("/home", {
                state: {
                  urlParam: "/home/share/" + urlParam,
                },
              });
            }
          } else {
            navigate("/invalidOrExpire/invalid");
          }
        } catch (err) {
          console.error("Tracking Error:", err);
          throw err;
        }
      }
    })();
  }, []);

  return (
    <div
      style={{ height: "200vh", width: "100vw", justifyContent: "center" }}
    ></div>
  );
};

export default ShareContentComponent;
