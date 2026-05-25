import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

export const createDeployment = async (data) => {
  return API.post("/deploy", data);
};

export const getDeploymentStatus = async (id) => {
  return API.get(`/status/${id}`);
};
