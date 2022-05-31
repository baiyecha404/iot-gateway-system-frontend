/* eslint-disable import/no-anonymous-default-export */
import API_URL from "../config";
import AuthService from "./Auth";
const axios = require("axios");


const createChannel = (name) => {
    return axios.post(`${API_URL}/gateway/channels`, {
        name
    }, {
        headers: AuthService.getAuthHeader()
    }).then(resp => {
        if (resp.data.id) {
            return { result: resp.data.id }
        }
    }).catch(err => {
        console.log(err);
        return { err: err.message }
    })
}

const getChannels = () => {
    return axios.get(`${API_URL}/gateway/channels`, {
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

const getChannelInfo = (channel_id) => {
    return axios.get(`${API_URL}/gateway/channels/${channel_id}`, {
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

const searchChannel = (keyword) => {
    return axios.get(`${API_URL}/gateway/channels?keyword=${keyword}`, {
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


const updateChannel = (channel_id, name) => {
    return axios.put(`${API_URL}/gateway/channels/${channel_id}`, {
        name
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


const deleteChannel = (channel_id) => {
    return axios.delete(`${API_URL}/gateway/channels/${channel_id}`, {
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


const getConnections = (channel_id) => {
    return axios.get(`${API_URL}/gateway/channels/${channel_id}/connections`, {
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


const createConnection = (channel_id, device_id) => {
    return axios.post(`${API_URL}/gateway/channels/${channel_id}/connect`, {
        device_id
    }, {
        headers: AuthService.getAuthHeader()
    }).then(resp => {
        if (resp.data.result) {
            return { result: resp.data.result }
        }

        if (resp.data.error) {
            return { err: resp.data.error }
        }
    }).catch(err => {
        console.log(err);
        return { err: err.message }
    })
}



const deleteConnection = (channel_id, device_id) => {
    return axios.post(`${API_URL}/gateway/channels/${channel_id}/disconnect`, {
        device_id
    }, {
        headers: AuthService.getAuthHeader()
    }).then(resp => {
        if (resp.data.result) {
            return { result: resp.data.result }
        }
        if (resp.data.error) {
            return { err: resp.data.error }
        }
    }).catch(err => {
        console.log(err);
        return { err: err.message }
    })
}

const startCronJob = (channel_id, device_id, attribute, duration) => {
    return axios.post(`${API_URL}/gateway/channels/${channel_id}/startCron`, {
        device_id, attribute, duration
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

const getCronJobs = (channel_id, device_id) => {
    return axios.post(`${API_URL}/gateway/channels/${channel_id}/cronJobs`, {
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


const stopCronJob = (channel_id, device_id, task_id) => {
    return axios.post(`${API_URL}/gateway/channels/${channel_id}/stopCron`, {
        device_id, task_id,
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



const sendMessage = (channel_id, device_id, msg) => {
    return axios.post(`${API_URL}/gateway/channels/${channel_id}/messages`, {
        device_id,
        data: {
            attribute: msg.attribute,
            action: msg.action,
            value: msg.value
        }
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

const getMessages = (channel_id) => {
    return axios.get(`${API_URL}/gateway/channels/${channel_id}/messages`, {
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
    getChannels,
    searchChannel,
    getChannelInfo,
    createChannel,
    updateChannel,
    deleteChannel,
    getConnections,
    createConnection,
    deleteConnection,
    sendMessage,
    startCronJob,
    getCronJobs,
    stopCronJob,
    getMessages
}