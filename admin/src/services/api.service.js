import axios from 'axios';

const api = "http://localhost:3000/api/v1"

export const addStudent = (body) => {
    return axios.post(`${api}/student`, body)
        .then(res => {
            if (res.status === 200) {
                return res.data || null;
            } else {
                return null
            }
        })
        .catch(err => {
            console.log(err);
            return null;
        });
}

export const uploadStudentExcel = (file) => {
    return axios.post(`${api}/student/upload`, file)
        .then(res => {
            if (res.status === 200) {
                return res.data || null;
            } else {
                return null
            }
        })
        .catch(err => {
            console.log(err);
            return null;
        });
}


export const allStudents = () => {
    return axios.get(`${api}/student`)
        .then(res => {
            if (res.status === 200) {
                return res.data || null;
            } else {
                return null
            }
        })
        .catch(err => {
            console.log(err);
            return null;
        });
}

export const getStudentById = (id) => {
    return axios.get(`${api}/student/${id}`)
        .then(res => {
            if (res.status === 200) {
                return res.data || null;
            } else {
                return null
            }
        })
        .catch(err => {
            console.log(err);
            return null;
        });
}

export const allClasses = () => {
    return axios.get(`${api}/class`)
        .then(res => {
            if (res.status === 200) {
                return res.data || null;
            } else {
                return null
            }
        })
        .catch(err => {
            console.log(err);
            return null;
        });
}

export const addClass = (body) => {
    return axios.post(`${api}/class`, body)
        .then(res => {
            if (res.status === 200) {
                return res.data || null;
            } else {
                return null
            }
        })
        .catch(err => {
            console.log(err);
            return null;
        });
}

export const editClass = (id, body) => {
    return axios.patch(`${api}/class/${id}`, body)
        .then(res => {
            if (res.status === 200) {
                return res.data || null;
            } else {
                return null
            }
        })
        .catch(err => {
            console.log(err);
            return null;
        });
}

export const getClassById = (id) => {
    return axios.get(`${api}/class/${id}`)
        .then(res => {
            if (res.status === 200) {
                return res.data || null;
            } else {
                return null
            }
        })
        .catch(err => {
            console.log(err);
            return null;
        });
}

export const addActualite = (body) => {
    return axios.post(`${api}/news`, body)
        .then(res => {
            if (res.status === 200) {
                return res.data || null;
            } else {
                return null
            }
        })
        .catch(err => {
            console.log(err);
            return null;
        });
}

export const getActualite = () => {
    return axios.get(`${api}/news`)
        .then(res => {
            if (res.status === 200) {
                return res.data || null;
            } else {
                return null
            }
        })
        .catch(err => {
            console.log(err);
            return null;
        });
}