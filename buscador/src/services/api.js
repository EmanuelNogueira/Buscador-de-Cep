import axios from "axios";

// https://viacep.com.br/ws/   45157000/json/

const api = axios.create({
  // URL base no qual eu estiver usando na minha API
  baseURL: "https://viacep.com.br/ws/",
});

export default api;
