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

const getQuizByUser = () => {
  return axios.get("v1/quiz-by-participant");
};

const getDataQuiz = (id) => {
  return axios.get(`v1/questions-by-quiz?quizId=${id}`);
};

const getDataQuizWithAnswers = (id) => {
  return axios.get(`v1/quiz-with-qa/${id}`);
};

const postSubmitQuiz = (data) => {
  return axios.post(`v1/quiz-submit`, { ...data });
};

const postCreateNewQuiz = (name, description, difficulty, image) => {
  const data = new FormData();
  data.append("description", description);
  data.append("name", name);
  data.append("difficulty", difficulty);
  data.append("quizImage", image);

  return axios.post(`v1/quiz`, data);
};

const getAllQuiz = (data) => {
  return axios.get(`v1/quiz/all`);
};

const putUpdateQuiz = (id, description, name, difficulty, quizImage) => {
  const data = new FormData();
  data.append("id", id);
  data.append("description", description);
  data.append("name", name);
  data.append("difficulty", difficulty);
  data.append("quizImage", quizImage);

  return axios.put("v1/quiz", data);
};

const deleteQuiz = (id) => {
  return axios.delete(`v1/quiz/${id}`);
};

const postCreateNewQuestionForQuiz = (quiz_id, description, questionImage) => {
  const data = new FormData();
  data.append("quiz_id", quiz_id);
  data.append("description", description);
  data.append("questionImage", questionImage);

  return axios.post("v1/question", data);
};

const postCreateNewAnswerForQuiz = (
  question_id,
  description,
  correct_answer,
) => {
  return axios.post("v1/answer", { question_id, description, correct_answer });
};

const postAssignQuizToUser = (quizId, userId) => {
  return axios.post("v1/quiz-assign-to-user", { quizId, userId });
};

const getQuestionByQuizId = (quizId) => {
  return axios.get(`v1/quiz-with-qa/${quizId}`);
};

const postLogout = (email, refresh_token) => {
  return axios.post(`v1/logout`, { email, refresh_token });
};

const getOverview = () => {
  return axios.get(`v1/overview`);
};

const getHistory = () => {
  return axios.get(`v1/history`);
};

const postChangePassword = (current_password, new_password) => {
  return axios.post(`v1/change-password`, { current_password, new_password });
};

const postUpdateProfile = (username, userImage) => {
  const data = new FormData();
  data.append("username", username);
  data.append("userImage", userImage);
  return axios.post(`v1/profile`, data);
};

export {
  postCreateUser,
  getAllUsers,
  putUpdateUser,
  deleteUser,
  getUserWithPaginate,
  postLogin,
  postRegister,
  getQuizByUser,
  getDataQuiz,
  postSubmitQuiz,
  postCreateNewQuiz,
  getAllQuiz,
  putUpdateQuiz,
  deleteQuiz,
  postCreateNewQuestionForQuiz,
  postCreateNewAnswerForQuiz,
  postAssignQuizToUser,
  getQuestionByQuizId,
  postLogout,
  getOverview,
  getHistory,
  postChangePassword,
  postUpdateProfile,
  getDataQuizWithAnswers,
};
