/* eslint-disable import/no-anonymous-default-export */
import API_URL from "../config";
const axios = require("axios");

const login = (username, password) => {
    return axios.post(`${API_URL}/auth/login`, {
        username,
        password
    }).then(resp => {
        if (resp.data.error) {
            return { err: resp.data.error };
        }

        if (resp.data.authToken && resp.data.user_id && resp.data.role) {
            localStorage.setItem("user", JSON.stringify(resp.data.authToken));
            localStorage.setItem("user_id", JSON.stringify(resp.data.user_id));
            localStorage.setItem("role", JSON.stringify(resp.data.role));
            return { result: true };
        } else {
            return { result: false };
        }


    }).catch(err => {
        console.log(err.message);
        return { err: err.message }
    });
}


const adminLogin = (username, password) => {
    return axios.post(`${API_URL}/auth/admin/login`, {
        username,
        password
    }).then(resp => {
        if (resp.data.error) {
            return { err: resp.data.error };
        }

        if (resp.data.token) {
            localStorage.setItem("user_token", JSON.stringify(resp.data));
            return { token: resp.data.token };
        }
    }).catch(err => {
        console.log(err.message);
        return { err: err.message }
    });
}

const adminVerify = (code) => {
    return axios.post(`${API_URL}/auth/admin/verify`, {
        code: code,
        token: JSON.parse(localStorage.getItem("user_token")).token
    }).then(resp => {
        if (resp.data.error) {
            return { err: resp.data.error };
        }
        if (resp.data.authToken) {
            localStorage.setItem("user", JSON.stringify(resp.data.authToken));
        }

        if (resp.data.user_id) {
            localStorage.setItem("user_id", JSON.stringify(resp.data.user_id));
        }

        localStorage.setItem("role", "admin")
        return true;
    }).catch(err => {
        console.log(err);
        return { err: err.message }
    })
}

const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("user_token");
    localStorage.removeItem("user_id");
};

const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("user_id"));
};

const getCurrentUserRole = () => {
    return JSON.parse(localStorage.getItem("role"));
};


const getAuthHeader = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
        return { Authorization: 'Bearer ' + user };
    } else {
        return {};
    }
}

const checkAdmin = () => {
    return JSON.parse(localStorage.getItem("role") === "admin");
}


export default {
    login,
    adminLogin,
    adminVerify,
    logout,
    checkAdmin,
    getCurrentUser,
    getCurrentUserRole,
    getAuthHeader
}