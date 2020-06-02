import axios from "axios";

export default axios.create({
  baseURL: "https://lamour-order-api.herokuapp.com",
  headers: {
    "Content-type": "application/json"
  }
});