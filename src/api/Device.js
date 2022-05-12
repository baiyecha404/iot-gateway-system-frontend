import API_URL from "../config";
import AuthService from "./Auth";
const axios = require("axios");


const ping = (host, port) => {
    return axios.post(`${API_URL}/ping`, {
        host, port
    }).then(resp => {
        if (resp.data.result) {
            return true
        }
        return false
    }).catch(err => {
        console.log(err);
        return { err: err.message }
    })
}

const getDevices = () => {
    return axios.get(`${API_URL}/gateway/devices`, {
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


const searchDevice = (keyword) => {
    return axios.get(`${API_URL}/gateway/devices?keyword=${keyword}`, {
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


const getDeviceInfo = (device_id) => {
    return axios.get(`${API_URL}/gateway/devices/${device_id}`, {
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



const createOne = (info) => {
    return axios.post(`${API_URL}/gateway/devices`, {
        name: info.deviceName,
        label: info.label,
        connect_uri: info.connect_uri,
        location: info.location
    }, {
        headers: AuthService.getAuthHeader()
    }).then(resp => {
        if (resp.data.id) {
            return resp.data.id
        }
    }).catch(err => {
        console.log(err);
        return { err: err.message }
    })
}


const updateDevice = (device_id, info) => {
    return axios.put(`${API_URL}/gateway/devices/${device_id}`, {
        name: info.name,
        label: info.label,
        connect_uri: info.connect_uri,
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


const getDeviceAttributes = (device_id) => {
    return axios.get(`${API_URL}/gateway/devices/${device_id}/attributes`, {
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

const addDeviceAttribute = (device_id, attr) => {
    return axios.put(`${API_URL}/gateway/devices/${device_id}`, {
        attributes: attr
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


const updateDeviceAttribute = (device_id, attr) => {
    return axios.post(`${API_URL}/gateway/devices/${device_id}/attributes`, {
        action: "update",
        attributes: attr
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

const deleteDeviceAttribute = (device_id, attribute_id) => {
    return axios.post(`${API_URL}/gateway/devices/${device_id}/attributes`, {
        action: "delete",
        id: attribute_id
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


const deleteDevice = (device_id) => {
    return axios.delete(`${API_URL}/gateway/devices/${device_id}`, {
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



const startDevice = (device_id) => {
    return axios.get(`${API_URL}/gateway/devices/${device_id}/start`, {
        headers: AuthService.getAuthHeader()
    }).then(resp => {
        if (resp.data.result) {
            return true
        }
        return false
    }).catch(err => {
        console.log(err);
        return false
    })
}


const stopDevice = (device_id) => {
    return axios.get(`${API_URL}/gateway/devices/${device_id}/stop`, {
        headers: AuthService.getAuthHeader()
    }).then(resp => {
        if (resp.data.result) {
            return true
        }
        return false
    }).catch(err => {
        console.log(err);
        return false
    })
}


const getDeviceConnections = (device_id) => {
    return axios.get(`${API_URL}/gateway/devices/${device_id}/connections`, {
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


const getDevicePolicies = (device_id) => {
    return axios.get(`${API_URL}/gateway/devices/${device_id}/policies`, {
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

const getDeviceMessages = (device_id) => {
    return axios.get(`${API_URL}/gateway/devices/${device_id}/attributes/messages`, {
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
    ping,
    getDevices,
    searchDevice,
    getDeviceInfo,
    startDevice,
    stopDevice,
    createOne,
    updateDevice,
    deleteDevice,
    getDeviceAttributes,
    addDeviceAttribute,
    updateDeviceAttribute,
    deleteDeviceAttribute,
    getDeviceConnections,
    getDevicePolicies,
    getDeviceMessages
}