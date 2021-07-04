/* eslint-disable */
const getCurrentUser = () => {
  const loggedInUser = sessionStorage.getItem('currentUser');
  if (loggedInUser) {
    const foundUser = JSON.parse(loggedInUser);
    return foundUser;
  }
  return { firstName: "", lastName: "" };
};
const setCurrentUser = (user) => {
  sessionStorage.setItem('currentUser', JSON.stringify(user));
};
const logoutUser = (props) => {
  sessionStorage.clear();
};
export { getCurrentUser, logoutUser, setCurrentUser };
