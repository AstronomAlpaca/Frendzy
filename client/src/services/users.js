/* eslint-disable import/no-anonymous-default-export */
import axios from "axios";
const baseUrl = "http://localhost:9000/api/users";

const getUser = (userName) => {
  const request = axios.get(`${baseUrl}/${userName}`);
  return request.then((response) => response.data);
};

export default { getUser };
