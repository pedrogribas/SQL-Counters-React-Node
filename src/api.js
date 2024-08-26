import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3003",
});

export const getCounters = async () => {
  try {
    const response = await api.get("/");
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const createCounter = async (name) => {
  try {
    const response = await api.post("/", { name });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const updateCounter = async (id, value) => {
  console.log(`Atualizando counter com id ${id} e value ${value}`);
  try {
    const response = await api.put(`/${id}`, { value });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const deleteCounter = async (id) => {
  try {
    const response = await api.delete(`/${id}`);
    const counters = await api.get("/");
    return counters.data;
  } catch (error) {
    console.error(error);
  }
};
