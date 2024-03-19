import axios from "axios";

//create instance of axios
const API = axios.create();

//this code is set up custom header in axios api call 
API.interceptors.request.use(function (config) {
    const token = localStorage.getItem('token');
    if (token !== null) {
        config.headers.token = token;
    }
    return config;
}, function (error) {
    return Promise.reject(error);
});

export default API;