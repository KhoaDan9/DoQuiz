import axios from "../utils/axiousCustomize";

const getAllUsers = async () => {
  return await axios.get("v1/participant/all");
};

const postCreateUser = (email, username, password, role, image) => {
  const data = new FormData();
  data.append("email", email);
  data.append("username", username);
  data.append("password", password);
  data.append("role", role);
  data.append("userImage", image);

  return axios.post("v1/participant", data);
};

const putUpdateUser = (id, username, role, image) => {
  const data = new FormData();
  data.append("id", id);
  data.append("username", username);
  data.append("role", role);
  data.append("userImage", image);

  return axios.put("v1/participant", data);
};

const deleteUser = (id) => {
  return axios.delete("v1/participant", { data: { id: id } });
};

const getUserWithPaginate = (page, limit) => {
  return axios.get(`v1/participant?page=${page}&limit=${limit}`);
};

const postLogin = (email, password) => {
  return axios.post("/v1/login", {
    email,
    password,
  });
};

const postRegister = (email, password, username) => {
  return axios.post("/v1/register", {
    email,
    password,
    username,
  });
};

export {
  postCreateUser,
  getAllUsers,
  putUpdateUser,
  deleteUser,
  getUserWithPaginate,
  postLogin,
  postRegister,
};
