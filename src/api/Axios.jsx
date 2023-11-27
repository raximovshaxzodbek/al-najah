import axios from "axios";

const Axios = axios.create({
  baseURL: "https://alnajah.pythonanywhere.com/",
});

export default Axios;
