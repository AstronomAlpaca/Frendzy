/* eslint-disable import/no-anonymous-default-export */
import axios from "axios";
const baseUrl = "http://localhost:9000/api/userPosts";

let token = null;

const setToken = (newToken) => {
  // see 4d - limiting creating notes to auth users
  token = `bearer ${newToken}`;
};

// Literally useless for now
const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data); //review arrow functions shorthand
};

const getPostsByUser = (id) => {
  const request = axios.get(`${baseUrl}/${id}`);
  return request.then((response) => response.data);
};

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.post(baseUrl, newObject, config);
  return response.data;
};

// todo
// const update = (id, newObject) => {
//   const request = axios.put(`${baseUrl}/${id}`, newObject);
//   return request.then((response) => response.data);
// };

export default { getAll, getPostsByUser, create, setToken };
