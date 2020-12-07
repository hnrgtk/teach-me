export function useLogin() {
  const isUserLogged = () => localStorage.getItem("loginToken") !== null;
  const getToken = () => localStorage.getItem("loginToken");
  function getUserId() {
    return localStorage.getItem("userId") || "";
  }
  const getUserCharge = () => localStorage.getItem("userCharge");

  const logout = () => localStorage.removeItem("loginToken");

  return { isUserLogged, getToken, getUserId, logout, getUserCharge };
}
