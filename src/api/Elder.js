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


export default {
    getElders,
    getElderInfo,
    searchElder
}