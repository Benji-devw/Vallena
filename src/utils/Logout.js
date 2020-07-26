import API from "./API";

// remove the token and user from the session storage
export const disconnect = () => {
     API.logout();
     window.location = "/";
};







// // return the user data from the session storage
// export const getUser = () => {
//      const userStr = sessionStorage.getItem('user');
//      if (userStr) return JSON.parse(userStr);
//      else return null;
// }

// // return the token from the session storage
// export const getToken = (data) => {
//      localStorage.setItem("token", data.token);
// }


// // set the token and user from the session storage
// export const setUserSession = (token, user) => {
//      sessionStorage.setItem('token', token);
//      sessionStorage.setItem('user', JSON.stringify(user));
// }