import axios from "axios";

// const BASE_URL = "https://69fa1137c509a40d3aa3d6bb.mockapi.io"; 

const BASE_URL = 'http://localhost:3000/api'

export const getTabs = async () => {
  const res = await axios.get(`${BASE_URL}/tabs`);
  console.log(res)
  return res
  // return axios.get(`${BASE_URL}/tabs`);
};

// Helper function to simulate PATCH using GET and PUT
const patchWithPut = async (tabId, partialData) => {
  const { data: currentTab } = await axios.get(`${BASE_URL}/tabs/${tabId}`);
  const updatedTab = { ...currentTab, ...partialData };
  return axios.put(`${BASE_URL}/tabs/${tabId}`, updatedTab);
}

export const updateTab = (tabId, updatedData) => {
  // Use the helper to simulate PATCH
  return patchWithPut(tabId, updatedData);
};

export const addTabApi = (newTab) => {
  return axios.post(`${BASE_URL}/tabs`, newTab);
};

export const deleteTabApi = (tabId) => {
  return axios.delete(`${BASE_URL}/tabs/${tabId}`);
};

export const renameTabApi = (tabId, newTitle) => {
  // Use the helper to simulate PATCH
  return patchWithPut(tabId, { title: newTitle });
};

// This function already receives the full tab object, so it can just use PUT directly.
export const setUpdats = (tab) => {
  return axios.put(`${BASE_URL}/tabs/${tab.id}`, tab);
};
