import axios from "axios";
import {API} from "./config"
export const getReportages = () => {
    return axios.get(`${API}/reportage`).then(res=>{
        return res.data
    })
}

export const getBySlug = (slug)=>{
    return axios.get(`${API}/reportage/${slug}`).then(res=>{
        return res.data
    })
}

export const getImageById = (id)=>{
    return axios.get(`${API}/reportage/image/${id}`).then(res=>{
        return res.data
    })
}