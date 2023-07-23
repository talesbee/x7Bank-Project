import axios from "axios";

// TODO: Add base url
const api = axios.create({
  baseURL: "https://my-json-server.typicode.com/talesbee/x7Bank-Project",
});

export default api;
