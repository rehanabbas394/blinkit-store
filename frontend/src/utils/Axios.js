import axios from 'axios'
import Api_endpoints, {baseURL} from '../common/api-details'

export const Axios = axios.create({
    baseURL: baseURL,
    withCredentials: true
}) 

// send access token in the header

Axios.interceptors.request.use(
    async (config) =>{
        let accessToken = localStorage.getItem("accesstoken")
        if(accessToken){
            config.headers.Authorization = `Bearer ${accessToken}`
        }
        return config
    },
    (error)=>{
        return Promise.reject(error)
    }
)

// refresh token

Axios.interceptors.request.use(
    (response)=>{
        return response
    },
    async (error)=>{
        let orginRequest = error.config

        if(error.response.status === '401' && !orginRequest.retry){
            orginRequest.retry = true
            const refreshToken = localStorage.getItem('refreshToken')
            if(refreshToken){
                const newAccessToken = RefreshTokenApi(refreshToken)
                if(newAccessToken){
                    originRequest.headers.Authorization = `Bearer ${newAccessToken}`
                    return Axios(originRequest)
                }
            }
        }
    }

)

// refreshToken
const RefreshTokenApi = async (refreshToken)=> {
    try {
        const response = await Axios({
            ...Api_endpoints.refreshToken,
            headers : {
            Authorization : `Bearer ${refreshToken}`
            }
        })
        const accessToken = response.data.data.accessToken
        localStorage.setItem('accesstoken',accessToken)
        return accessToken

    } catch(error){
        console.log(error)
    }
}