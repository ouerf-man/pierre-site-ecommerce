import axios from "axios";

//export const api = "https://api.pierregassin.com"
export const api = "http://localhost:8080";

export const addReportage = (body) => {
  return axios
    .post(`${api}/reportage`, body)
    .then((res) => {
      if (res.status === 200) {
        return res.data || null;
      } else {
        return null;
      }
    })
    .catch((err) => {
      console.log(err);
      return null;
    });
};

export const updateReportage = (body, id) => {
  return axios
    .put(`${api}/reportage/id/${id}`, body)
    .then((res) => {
      if (res.status === 200) {
        return res.data || null;
      } else {
        return null;
      }
    })
    .catch((err) => {
      console.log(err);
      return null;
    });
};

export const getReportages = (page,limit) => {
  return axios
    .get(`${api}/reportage?page=${page}&limit=${limit}`)
    .then((res) => {
      if (res.status === 200) {
        return res.data || null;
      } else {
        return null;
      }
    })
    .catch((err) => {
      console.log(err);
      return null;
    });
};

export const getReportage = (id) => {
  return axios
    .get(`${api}/reportage/id/${id}`)
    .then((res) => {
      if (res.status === 200) {
        return res.data || null;
      } else {
        return null;
      }
    })
    .catch((err) => {
      console.log(err);
      return null;
    });
};

export const deleteReportage = (id) => {
  return axios
    .delete(`${api}/reportage/id/${id}`)
    .then((res) => {
      if (res.status === 200) {
        return res.data || null;
      } else {
        return null;
      }
    })
    .catch((err) => {
      console.log(err);
      return null;
    });
};

export const addPhoto = (id, body) => {
  return axios
    .post(`${api}/reportage/${id}/image`, body)
    .then((res) => {
      if (res.status === 200) {
        return res.data || null;
      } else {
        return null;
      }
    })
    .catch((err) => {
      console.log(err);
      return null;
    });
};

export const deletePhoto = (id) =>{
  return axios
    .delete(`${api}/reportage/image/${id}`)
    .then((res) => {
      if (res.status === 200) {
        return res.data || null;
      } else {
        return null;
      }
    })
    .catch((err) => {
      console.log(err);
      return null;
    });
}

export const addBlog = (body) => {
  return axios
    .post(`${api}/blog`, body)
    .then((res) => {
      if (res.status === 200) {
        return res.data || null;
      } else {
        return null;
      }
    })
    .catch((err) => {
      console.log(err);
      return null;
    });
};

export const addBlogBanner = (body) => {
  return axios.post(`${api}/blog/image`, body).then((res) => {
    return res.data;
  });
};

export const getBlogs = () => {
  return axios
    .get(`${api}/blog`)
    .then((res) => {
      if (res.status === 200) {
        return res.data || null;
      } else {
        return null;
      }
    })
    .catch((err) => {
      console.log(err);
      return null;
    });
};

export const getBlog = (id) => {
  return axios
    .get(`${api}/blog/${id}`)
    .then((res) => {
      if (res.status === 200) {
        return res.data || null;
      } else {
        return null;
      }
    })
    .catch((err) => {
      console.log(err);
      return null;
    });
};

export const updateBlog = (id, body) => {
  return axios
    .put(`${api}/blog/${id}`, body)
    .then((res) => {
      if (res.status === 200) {
        return res.data || null;
      } else {
        return null;
      }
    })
    .catch((err) => {
      console.log(err);
      return null;
    });
};

export const deleteBlog = (id) => {
  return axios
    .delete(`${api}/blog/${id}`)
    .then((res) => {
      if (res.status === 200) {
        return res.data || null;
      } else {
        return null;
      }
    })
    .catch((err) => {
      console.log(err);
      return null;
    });
};

export const updateCoeff = (id, body) => {
  return axios
    .put(`${api}/coeff/${id}`, body)
    .then((res) => {
      if (res.status === 200) {
        return res.data || null;
      } else {
        return null;
      }
    })
    .catch((err) => {
      console.log(err);
      return null;
    });
};

export const getCoeff = () => {
  return axios
    .get(`${api}/coeff`)
    .then((res) => {
      if (res.status === 200) {
        return res.data || null;
      } else {
        return null;
      }
    })
    .catch((err) => {
      console.log(err);
      return null;
    });
};

export const getInfos = () => {
  return axios
    .get(`${api}/infos`)
    .then((res) => {
      if (res.status === 200) {
        return res.data || null;
      } else {
        return null;
      }
    })
    .catch((err) => {
      console.log(err);
      return null;
    });
};

export const updateInfos = (id, body) => {
  return axios
    .put(`${api}/infos/${id}`, body)
    .then((res) => {
      if (res.status === 200) {
        return res.data || null;
      } else {
        return null;
      }
    })
    .catch((err) => {
      console.log(err);
      return null;
    });
};

export const loginAdmin = (body) => {
  return axios
    .post(`${api}/admin/login`, body)
    .then((res) => {
      if (res.status === 200) {
        return res.data || null;
      } else {
        return null;
      }
    })
    .catch((err) => {
      console.log(err);
      return null;
    });
};

export const getContact = ()=>{
  return axios
    .get(`${api}/contact`)
    .then((res) => {
      if (res.status === 200) {
        return res.data || null;
      } else {
        return null;
      }
    })
    .catch((err) => {
      console.log(err);
      return null;
    });
}

export const resetPasswordRequest = (email) => {
  return axios.get(`${api}/admin/resetPassword?email=${email}`).then((res) => {
    if (res.status === 200) {
      return res.data || null;
    } else {
      return null;
    }
  })
  .catch((err) => {
    console.log(err);
    return null;
  });
};

export const resetPassword = (body) => {
  return axios.post(`${api}/admin/resetPassword`, body).then((res) => {
    if (res.status === 200) {
      return res.data || null;
    } else {
      return null;
    }
  })
  .catch((err) => {
    console.log(err);
    return null;
  });
};
