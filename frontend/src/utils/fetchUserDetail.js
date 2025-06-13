import Api_endpoints from "../common/api-details";
import { Axios } from "./Axios";

const fetchUserDetail = async () => {
    try {
       const response = await  Axios({
        ...Api_endpoints.userDetails
       })
       return response.data
    } catch (error) {
        console.log("error while fetching user details", error)
    }
}

export default fetchUserDetail;