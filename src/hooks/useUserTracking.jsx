import { useCallback } from 'react';
import { postData } from "../axios/apiHelper";
import { ENDPOINT } from "../axios/apiConfig";

const useUserTracking = () => {
  const trackUserAction = useCallback(
    async (id=0, action ,title,flag = null) => {
      try {
        const { data } = await postData(`${ENDPOINT.TRACKING}`, { article_id: id, action ,timeline_action: title ,flag});
        return data; 
      } catch (err) {
        console.error('Tracking Error:', err);
        throw err;
      }
    },
    [] 
  );

  return trackUserAction;
};

export default useUserTracking;
