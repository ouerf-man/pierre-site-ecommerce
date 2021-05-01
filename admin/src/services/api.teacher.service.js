import axios from 'axios';

const api = "http://localhost:3000/api/v1"

export const addTeacher = (body) => {
    return axios.post(`${api}/teacher`, body)
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

export const uploadFile = (file) => {
    return axios.post(`${api}/teacher/upload`, file)
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


export const allTeachers = () => {
    return axios.get(`${api}/teacher`)
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

export const getTeacherById = (id) => {
    return axios.get(`${api}/teacher/${id}`)
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