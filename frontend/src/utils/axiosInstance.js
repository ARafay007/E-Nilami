import axios from "axios";
import { baseURL } from "./apiEndpoints";

const api = axios.create({
    baseURL: baseURL,
    timeout: 3000,
    headers: {'authorization': `${sessionStorage.getItem('token')}`}
});

export default api;

