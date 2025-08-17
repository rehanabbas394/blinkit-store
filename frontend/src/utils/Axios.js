import axios from 'axios'
import Api_endpoints, {baseURL} from '../common/api-details'

export const Axios = axios.create({
    baseURL: baseURL,
    withCredentials: true
}) 