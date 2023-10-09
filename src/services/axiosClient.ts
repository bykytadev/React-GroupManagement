import axios from "axios";
import { getItem } from "storage/StorageCache";

const http = axios.create({
  baseURL: "http://localhost:8080/api/v1",
  responseType: "json",
  timeout: 3000,
  headers: {
    "Content-Type": "application/json",
  },
});

http.interceptors.request.use((config) => {
  const loginData = getItem("loginData")
    ? JSON.parse(getItem("loginData") as string)
    : {};
  if (loginData?.token) {
    config.headers["Authorization"] = "Bearer " + loginData.token;
  }
  return config;
});

axios.interceptors.response.use(
  function (response) {
    // Bất kì mã trạng thái nào nằm trong tầm 2xx đều khiến hàm này được trigger
    // Làm gì đó với dữ liệu response
    return response;
  },
  function (error) {
    // Bất kì mã trạng thái nào lọt ra ngoài tầm 2xx đều khiến hàm này được trigger
    // Làm gì đó với lỗi response
    return Promise.reject(error);
  }
);

export default http;
