import axios from "axios";
const headers = {
  "Content-Type": "application/json"
};
const burl = "http://localhost:8805";
// const burl = "/api/users";

export default {
  login: function (email, password) {
    return axios.post(
      `${burl}/user/login`,
      {
        email,
        password
      },
      {
        headers: headers
      }
    );
  },
  signup: function (send) {
    return axios.post(`${burl}/user/signup`, send, { headers: headers });
  },

  isAuth: function () {
    return localStorage.getItem("token") !== null;
  },

  getUsers: function () {
    return axios.get(
      `${burl}/user/getusers`,
      { headers: headers }
    )
  },
  
  deleteUser: function (username) {
    return axios.delete(
      `${burl}/user/deleteuser`,
      {data: {  // Data créer le corp de la requete sinon vide (propre au delete)
        username: username
      }},
      { headers: headers });
  },

  logout: function () {
    localStorage.clear();
  }
};
