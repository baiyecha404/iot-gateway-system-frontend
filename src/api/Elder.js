import API_URL from "../config";
import AuthService from "./Auth";
const axios = require("axios");


const getElders = () => {
    return axios.get(`${API_URL}/elders`, {
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


const getElderInfo = (elder_id) => {
    return axios.get(`${API_URL}/elders/${elder_id}`, {
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

const searchElder = (keyword) => {
    return axios.get(`${API_URL}/elders?keyword=${keyword}`, {
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

const updateElderInfo = (elder_id, info) => {
    return axios.put(`${API_URL}/elders/${elder_id}`, {
        age: info.age,
        address: info.address
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

const getElderDevices = (elder_id) => {
    return axios.get(`${API_URL}/elders/${elder_id}/devices`, {
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


const bindElderDevice = (elder_id, device_id) => {
    return axios.post(`${API_URL}/elders/${elder_id}/devices`, {
        device_id
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
    getElders,
    getElderInfo,
    updateElderInfo,
    searchElder,
    getElderDevices,
    bindElderDevice
}