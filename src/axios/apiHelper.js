import axios from "./index";

export const postData = (end_point, data) => {
  return axios.post(end_point, data);
};
export const externalApi = (end_point,method,data) => {
  return axios({
    method:method,
    data:data,
    baseURL: end_point,
    headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }},);
};
export const getData = (end_point) => {
  return axios.get(end_point);
};

export const docintelExternal = (end_point,method,data) => {
  return axios({
    method:method,
    data:data,
    baseURL: end_point,
    headers: {
    Accept: '*',
    "Content-Type": "multipart/form-data",
  }},);
};
