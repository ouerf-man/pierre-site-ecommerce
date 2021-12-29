import axios from "axios";
import { API } from "./config"

export const getInfos = () => {
    return axios.get(`${API}/infos`).then(res => {
        return res.data
    })
}
