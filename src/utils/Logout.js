import API from "./API";

// remove the token and user from the session storage
export const disconnect = () => {
     API.logout();
     window.location = "/";
};
