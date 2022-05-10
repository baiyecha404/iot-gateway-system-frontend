import API_URL from "../config";
import AuthService from "./Auth";
const axios = require("axios");


const addDevicePolicy = (subject, object, action) => {
    return axios.post(`${API_URL}/policies/add`, {
        type: "device",
        subject, object, action
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


const removeDevicePolicy = (subject, object, action) => {
    return axios.post(`${API_URL}/policies/delete`, {
        type: "device",
        subject, object, action
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


const addGroupPolicy = (subject, object, action) => {
    return axios.post(`${API_URL}/policies/add`, {
        type: "group",
        subject, object, action
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

const removeGroupPolicy = (subject, object, action) => {
    return axios.post(`${API_URL}/policies/delete`, {
        type: "group",
        subject, object, action
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


// eslint-disable-next-line import/no-anonymous-default-export
export default {
    addDevicePolicy,
    addGroupPolicy,
    removeDevicePolicy,
    removeGroupPolicy,
}

