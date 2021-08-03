import axios from 'axios';

const api = "https://27f4f17f62d3.ngrok.io"

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
    return axios.post(`${api}/blog/image`,body)
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

export const updateBlog = (id,body) => {
    return axios.put(`${api}/blog/${id}`,body)
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

export const deleteBlog = (id) => {
    return axios.delete(`${api}/blog/${id}`)
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

export const updateCoeff = (id,body) => {
    return axios.put(`${api}/coeff/${id}`,body)
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

export const getCoeff = () => {
    return axios.get(`${api}/coeff`)
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