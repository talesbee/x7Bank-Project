import axios from "axios";

// TODO: Add base url
const api = axios.create({
  baseURL: "https://my-json-server.typicode.com/<seu-usuario>/<seu-repositorio>",
});

export default api;
