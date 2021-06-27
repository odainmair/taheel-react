const { APIRequest } = require("src/api/APIRequest");

const Login = (email, password) => {

    const requestBody = {
        username: email,
        password: password
      };
    const url = '/taheel-apis-users-login-v2'
    const response = await APIRequest({ requestBody, url });
};
    export default {Login}; 