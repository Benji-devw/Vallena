import CallUsers from "../apiCall/CallUsers.js";

// remove the token and user from the session storage
export const disconnect = () => {
     CallUsers.logout();
     window.location = "/";
};
