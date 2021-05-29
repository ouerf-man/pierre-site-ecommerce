import axios from 'axios';

const api = "http://localhost:8080"

export const addReportage = (body) => {
    return axios.post(`${api}/reportage`, body)
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

export const getReportages = () => {
    return axios.get(`${api}/reportage`)
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

export const getReportage = (id) => {
    return axios.get(`${api}/reportage/id/${id}`)
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

export const addPhoto = (id, body) => {
    return axios.post(`${api}/reportage/${id}/image`, body)
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

export const addBlog = (body) => {
    return axios.post(`${api}/blog`, body)
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

export const addBlogBanner = (body) => {
    return axios.post(`${api}/blog/image`)
        .then(res => {
            return res.data
        })
}

export const getBlogs = () => {
    return axios.get(`${api}/blog`)
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

export const getBlog = (id) => {
    return axios.get(`${api}/blog/${id}`)
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