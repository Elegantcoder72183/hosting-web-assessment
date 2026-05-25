import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const createDeployment = async (data) => {
  return API.post("/deploy", data);
};

export const getDeploymentStatus = async (id) => {
  return API.get(`/status/${id}`);
};
