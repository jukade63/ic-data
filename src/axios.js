import axios from "axios";

const baseURL =
  process.env.NODE_ENV === "production"
    ? "http://54.151.154.92/api"
    : "http://localhost:8080/api";

export default axios.create({
  baseURL,
});