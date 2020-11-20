export const isUserLogged = () => localStorage.getItem("loginToken") !== null;
export const getToken = () => localStorage.getItem("loginToken");
