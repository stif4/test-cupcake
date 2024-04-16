import { fetchData } from "./fetchData";

const BASE_URL = "http://localhost:3000/api/v1/";

const api = {
  firstInit: BASE_URL + "first",
  firstPull: BASE_URL + "first/poll",
  secondInit: BASE_URL + "second",
  secondPull: BASE_URL + "second/poll",
  thirdInit: BASE_URL + "third",
  thirdPull: BASE_URL + "third/poll",
};

export default api;
