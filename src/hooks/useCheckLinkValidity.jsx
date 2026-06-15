import { postData } from "../axios/apiHelper";
import { ENDPOINT } from "../axios/apiConfig";
import { useNavigate } from "react-router-dom";
import { loader } from "../util/utils";

const useCheckLinkValidity = () => {
  const navigate = useNavigate();

  const validOrExpireLink = async (qrToken, path = "") => {
    try {
      const itemLength = qrToken.split("_").length;
      if (itemLength === 3) {
        const data = await postData(`${ENDPOINT.QRCODE_LINK_VALIDATION}`, {
          qrCodeToken: qrToken,
        });
        if (!data?.data?.status) {
          if (data?.data?.type === "1") {
            navigate("/invalidOrExpire/invalid");
          } else {
            navigate("/invalidOrExpire/expire");
          }
        } else if (path === "login")
          navigate("/login", {
            state: {
              qrToken,
            },
          });
      } else {
        navigate("/invalidOrExpire/invalid");
      }
    } catch (err) {
      console.error("Tracking Error:", err);
      throw err;
    } finally {
    }
  };

  return validOrExpireLink;
};

export default useCheckLinkValidity;
