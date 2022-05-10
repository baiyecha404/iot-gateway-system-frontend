import API_URL from "../config";
import AuthService from "./Auth";
const axios = require("axios");


const getUsers = () => {
    return axios.get(`${API_URL}/users`, {
        headers: AuthService.getAuthHeader()
    }).then(resp => {
        if (resp.data.result) {
            return { result: resp.data.result }
        }
    }).catch(err => {
        console.log(err);
        return { err: err.message }
    })
}

const searchUser = (keyword) => {
    return axios.get(`${API_URL}/users?keyword=${keyword}`, {
        headers: AuthService.getAuthHeader()
    }).then(resp => {
        if (resp.data.result) {
            return { result: resp.data.result }
        }
    }).catch(err => {
        console.log(err);
        return { err: err.message }
    })
}

const getUserInfo = (user_id) => {
    return axios.get(`${API_URL}/users/${user_id}`, {
        headers: AuthService.getAuthHeader()
    }).then(resp => {
        if (resp.data.result) {
            return { result: resp.data.result }
        }
    }).catch(err => {
        console.log(err);
    })
}

const updateUserInfo = (user_id, user_info) => {
    return axios.put(`${API_URL}/users/${user_id}`, {
        username: user_info.username,
        phone_number: user_info.phone_number,
        group: user_info.group,
    }, {
        headers: AuthService.getAuthHeader()
    }).then(resp => {
        if (resp.data.result) {
            return { result: resp.data.result }
        }
    }).catch(err => {
        console.log(err);
        return { err: err.message }
    })
}

const updateUserPassword = (user_id, password, new_password) => {
    return axios.put(`${API_URL}/users/${user_id}`, {
        password, new_password
    }, {
        headers: AuthService.getAuthHeader()
    }).then(resp => {
        if (resp.data.error) {
            return { err: resp.data.error }
        }
        if (resp.data.result) {
            return { result: resp.data.result }
        }
    }).catch(err => {
        console.log(err);
        return { err: err.message }
    })
}



const deleteUser = (user_id) => {
    return axios.delete(`${API_URL}/users/${user_id}`, {
        headers: AuthService.getAuthHeader()
    }).then(resp => {
        if (resp.data.result) {
            return { result: resp.data.result }
        }
    }).catch(err => {
        console.log(err);
        return { err: err.message }
    })
}

const getLoginHistory = (user_id) => {
    return axios.get(`${API_URL}/users/${user_id}/history`, {
        headers: AuthService.getAuthHeader()
    }).then(resp => {
        if (resp.data.result) {
            return { result: resp.data.result }
        }
    }).catch(err => {
        console.log(err);
    })
}



const updateCurrentUserInfo = (username, phone_number) => {
    const user_id = AuthService.getCurrentUser()
    return axios.put(`${API_URL}/users/${user_id}`, {
        username, phone_number
    }, {
        headers: AuthService.getAuthHeader()
    }).then(resp => {
        if (resp.data.result) {
            return { result: resp.data.result }
        }
    }).catch(err => {
        console.log(err);
        return { err: err.message }
    })
}

const updateCurrentUserPassword = (password, new_password) => {
    const user_id = AuthService.getCurrentUser()
    return axios.put(`${API_URL}/users/${user_id}`, {
        password, new_password
    }, {
        headers: AuthService.getAuthHeader()
    }).then(resp => {
        if (resp.data.error) {
            return { err: resp.data.error }
        }
        if (resp.data.result) {
            return { result: resp.data.result }
        }
    }).catch(err => {
        console.log(err);
        return { err: err.message }
    })
}


const getUserPolicies = (user_id) => {
    return axios.get(`${API_URL}/users/${user_id}/policies`, {
        headers: AuthService.getAuthHeader()
    }).then(resp => {
        if (resp.data.result) {
            return { result: resp.data.result }
        }
    }).catch(err => {
        console.log(err);
        return { err: err.message }
    })
}

const getUserLogs = (user_id) => {
    return axios.get(`${API_URL}/users/${user_id}/logs`, {
        headers: AuthService.getAuthHeader()
    }).then(resp => {
        if (resp.data.result) {
            return { result: resp.data.result }
        }
    }).catch(err => {
        console.log(err);
        return { err: err.message }
    })
}



// eslint-disable-next-line import/no-anonymous-default-export
export default {
    getLoginHistory,
    getUsers,
    searchUser,
    getUserInfo,
    updateUserInfo,
    updateUserPassword,
    deleteUser,
    updateCurrentUserInfo,
    updateCurrentUserPassword,
    getUserPolicies,
    getUserLogs
}