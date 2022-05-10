import API_URL from "../config";
import AuthService from "./Auth";
const axios = require("axios");


const getGroups = () => {
    return axios.get(`${API_URL}/groups`, {
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

const getGroupInfo = (group_id) => {
    return axios.get(`${API_URL}/groups/${group_id}`, {
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


const searchGroup = (keyword) => {
    return axios.get(`${API_URL}/groups?keyword=${keyword}`, {
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

const createGroup = (name, type, description) => {
    return axios.post(`${API_URL}/groups`, {
        name, type, description
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

const updateGroup = (group_id, name, type, description) => {
    return axios.put(`${API_URL}/groups/${group_id}`, {
        name, type, description
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

const deleteGroup = (group_id) => {
    return axios.delete(`${API_URL}/groups/${group_id}`, {
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

const addGroupMember = (group_id, user_id) => {
    return axios.post(`${API_URL}/groups/${group_id}/members`, {
        user_id
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


const removeGroupMember = (group_id, user_id) => {
    return axios.delete(`${API_URL}/groups/${group_id}/members/${user_id}`, {
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


const getGroupPolicies = (group_id) => {
    return axios.get(`${API_URL}/groups/${group_id}/policies`, {
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
    getGroups,
    searchGroup,
    getGroupInfo,
    createGroup,
    updateGroup,
    deleteGroup,
    addGroupMember,
    removeGroupMember,
    getGroupPolicies
}