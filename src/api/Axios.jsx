import axios from "axios";

const Axios = axios.create({
  baseURL: "http://192.168.142.238:8000/",
});

export default Axios;
