import axios from "axios";
import {API} from "./config"

export const getBlogs = () => {
    return axios.get(`${API}/blog`).then(res=>{
        return res.data
    })
}

export const getBySlug = (slug) => {
    return axios.get(`${API}/blog/slug/${slug}`).then(res=>{
        return res.data
    })
}