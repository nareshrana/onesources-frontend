import axios from "axios";
import { toast } from "react-toastify";
// For GET requests
const logout = () => {
  localStorage.removeItem('dhdjdluytt');
  localStorage.removeItem('bhdkdlolepk');
  localStorage.removeItem('dhdjdluytp');
  localStorage.removeItem('un');
  localStorage.removeItem('name');
  localStorage.removeItem('country');
  localStorage.removeItem('email');
  localStorage.removeItem('ct');
  localStorage.removeItem('ec');
  localStorage.removeItem('questionArray');
  window.location.href = "/login";
}
const requestHelper = axios.create({
  baseURL: import.meta.env.VITE_REACT_APP_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

requestHelper.interceptors.request.use(
  (req) => {
    const token = localStorage.getItem("dhdjdluytt");
    req.headers["Authorization"] = 'Bearer '+token;
    const frontendId=3
    if (frontendId) {
      req.params = req.params || {};
      req.params.frontendId = frontendId;
    }
    return req;
  },
  (err) => {
    return Promise.reject(err);
  }
);
// For POST requests
requestHelper.interceptors.response.use(
  (res) => {
    return res;
  },
  (err) => {
    switch (err?.response?.status) {
      case 401:
        logout();
        break;
      case 500:
        toast.error(err?.response?.data?.error);
      case 400:
        toast.error(err?.response?.data?.error);
      default:
        break;
    }
    return Promise.reject(err);
  }
);

export default requestHelper;
