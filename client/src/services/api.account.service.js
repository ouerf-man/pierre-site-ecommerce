import axios from "axios";
import { API } from "./config"

export const getCoeff = () => {
    return axios.get(`${API}/coeff`).then(res => {
        return res.data
    })
}

export const charge = (body) => {
    return axios.post(`${API}/payment/charge`, body).then(res => {
        return res.data
    })
}

export const getTransactions = (id) => {
    return axios.get(`${API}/payment/${id}`).then(res => {
        return res.data
    })
}

export const signUp = body => {
    return axios.post(`${API}/user/register`, body).then(res => {
        return res.data
    })
}

export const login = body => {
    return axios.post(`${API}/user/login`, body).then(res => {
        return res.data
    })
}

export const contact = body =>  {
    return axios.post(`${API}/contact`, body).then(res => {
        return res.data
    })
}