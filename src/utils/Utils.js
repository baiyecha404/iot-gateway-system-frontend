const downloadFile = ({ data, fileName, fileType }) => {
    const blob = new Blob([data], { type: fileType })
    const a = document.createElement('a')
    a.download = fileName
    a.href = window.URL.createObjectURL(blob)
    const clickEvt = new MouseEvent('click', {
        view: window,
        bubbles: true,
        cancelable: true,
    })
    a.dispatchEvent(clickEvt)
    a.remove()
}

const downloadFileByUrl = ({ url, fileName }) => {
    const a = document.createElement('a')
    a.download = fileName
    a.href = url;
    const clickEvt = new MouseEvent('click', {
        view: window,
        bubbles: true,
        cancelable: true,
    })
    a.dispatchEvent(clickEvt)
    a.remove()
}


const groupBy =  (xs, key) => {
    return xs.reduce((rv, x) => {
        (rv[x[key]] = rv[x[key]] || []).push(x);
        return rv;
    }, {});
};

const parseSeverity = (severity) => {
    switch (severity) {
        case "normal":
            return "success";
        case "warning":
            return "warning"
        case "danger":
            return "error"
        default:
            break
    }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    downloadFile,
    downloadFileByUrl,
    groupBy,
    parseSeverity
}