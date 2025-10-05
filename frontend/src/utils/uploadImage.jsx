import { Axios } from "../utils/Axios";
import Api_endpoints from "../common/api-details";

const uploadImage = async (image) => {
  try {
    const formData = new FormData();
    formData.append("image", image); 

    const response = await Axios({
      ...Api_endpoints.uploadImage,
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response;
  } catch (error) {
    console.error('Upload error:', error);
    throw error; 
  }
};

export default uploadImage;
