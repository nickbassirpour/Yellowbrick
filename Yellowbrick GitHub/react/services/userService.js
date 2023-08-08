import axios from "axios";
import {
  onGlobalError,
  onGlobalSuccess,
  API_HOST_PREFIX,
} from "./serviceHelpers";
const endpoint = { endpointUrl: `${API_HOST_PREFIX}/api/users` };

const addUser = (payload) => {
  const config = {
    method: "POST",
    url: `${endpoint.endpointUrl}`,
    data: payload,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

const loginUser = (payload) => {
  const config = {
    method: "POST",
    url: `${endpoint.endpointUrl}/login`,
    data: payload,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

const getCurrent = () => {
  const config = {
    method: "POST",
    url: `${endpoint.endpointUrl}/current`,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

const logOut = () => {
  const config = {
    method: "GET",
    url: `${endpoint.endpointUrl}/logout`,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

const confirmEmail = (email, token) => {
  const config = {
    method: "PUT",
    url: `${endpoint.endpointUrl}/confirm/?email=${email}&token=${token}`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

const requestReset = (email) => {
  const config = {
    method: "PUT",
    url: `${endpoint.endpointUrl}/requestreset/?email=${email}`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

const updatePassword = (payload) => {
  const config = {
    method: "PUT",
    url: `${endpoint.endpointUrl}/updatepassword`,
    data: payload,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

const adminInvite = (payload) => {
  const config = {
    method: "POST",
    url: `${endpoint.endpointUrl}/admininvite`,
    data: payload,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

const changeStatus = (email, statusTypeId) => {
  const config = {
    method: "PUT",
    url: `${endpoint.endpointUrl}/changestatus/?email=${email}&statusTypeId=${statusTypeId}`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

const getAllUnpaginated = () => {
  const config = {
    method: "GET",
    url: `${endpoint.endpointUrl}`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

const getById = (id) => {
  const config = {
    method: "GET",
    url: `${endpoint.endpointUrl}/${id}`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

const getAllDashboard = () => {
  const config = {
      method: "GET",
      url: `${endpoint.endpointUrl}/dashboard`,
      withCredentials: true,
      crossdomain: true,
      headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

const getAllDashboardById = (id) => {
  const config = {
    method: "GET",
    url: `${endpoint.endpointUrl}/dashboard/${id}`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

const searchPaginate = (pageIndex, pageSize, query) => {
  const config = {
    method: "GET",
    url: `${endpoint.endpointUrl}/search?pageIndex=${pageIndex}&&pageSize=${pageSize}&&query=${query}`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

const getAllPaginated = (pageIndex, pageSize) => {
  const config = {
    method: "GET",
    url: `${endpoint.endpointUrl}/paginate?pageIndex=${pageIndex}&&pageSize=${pageSize}`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

const updateStatus = (email, statusId) => {
  const config = {
    method: "put",
    url: `${endpoint.endpointUrl}/changestatus?email=${email}&&statusTypeId=${statusId}`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

const update = (id, payload) => {
  const config = {
    method: "PUT",
    url: `${endpoint.endpointUrl}/${id}`,
    data: payload,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

const getAllByRole = (role, pageIndex, pageSize) => {
  const config = {
    method: "GET",
    url: `${endpoint.endpointUrl}/paginate/role-filter/?pageIndex=${pageIndex}&pageSize=${pageSize}&role=${role}`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

const userService = {
  addUser,
  loginUser,
  getCurrent,
  logOut,
  confirmEmail,
  requestReset,
  updatePassword,
  adminInvite,
  changeStatus,
  getAllUnpaginated,
  getById,
  update,
  updateStatus,
  getAllPaginated,
  searchPaginate,
  getAllDashboard,
  getAllDashboardById,
  getAllByRole,
};

export default userService;
