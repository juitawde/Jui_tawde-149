const API_URL = "https://hospital-management-xeh3.onrender.com/api";

const request = async (endpoint, options = {}) => {
  const response = await fetch(`${API_URL}${endpoint}`, {
    credentials: "include",

    headers: {
      "Content-Type": "application/json",
      ...options.headers
    },

    ...options
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong");
  }

  return data;
};

// AUTH

export const registerUser = (userData) => {
  return request("/auth/register", {
    method: "POST",
    body: JSON.stringify(userData)
  });
};

export const loginUser = (userData) => {
  return request("/auth/login", {
    method: "POST",
    body: JSON.stringify(userData)
  });
};

export const logoutUser = () => {
  return request("/auth/logout", {
    method: "POST"
  });
};

export const getCurrentUser = () => {
  return request("/auth/me");
};

// HOSPITALS

export const getHospitals = () => {
  return request("/hospitals");
};

export const getAvailableHospitals = () => {
  return request("/hospitals/available");
};

export const createHospital = (hospital) => {
  return request("/hospitals", {
    method: "POST",
    body: JSON.stringify(hospital)
  });
};

export const updateHospital = (id, hospital) => {
  return request(`/hospitals/${id}`, {
    method: "PUT",
    body: JSON.stringify(hospital)
  });
};

export const deleteHospital = (id) => {
  return request(`/hospitals/${id}`, {
    method: "DELETE"
  });
};
