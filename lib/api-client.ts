import axios from "axios";

export const client = axios.create({
  baseURL: process.env.FRONT_URL,
});

client.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error(error.response.data);
    return Promise.reject(error);
  }
);
