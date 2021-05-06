/* eslint-disable */
const getCurrentUser = () => {
    const loggedInUser = localStorage.getItem('currentUser');
    if (loggedInUser) {
        const foundUser = JSON.parse(loggedInUser);
        return foundUser;
    }
    return {firstName:"",lastName:""};
};
const setCurrentUser = (user) => {
     localStorage.setItem('currentUser', JSON.stringify(user));
};
const logoutUser = (props) => {
    localStorage.clear();
};
export { getCurrentUser, logoutUser, setCurrentUser };
