import { FaRegUserCircle } from "react-icons/fa";
import { useState } from "react";
import { IoClose } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import AxiosToastError from "../utils/Axios-toast-error";
import { Axios } from "../utils/Axios";
import Api_endpoints from "../common/api-details";
import { updateAvatar } from "../store/userSlice";
import fetchUserDetail from "../utils/fetchUserDetail";


function UserProfileAvatarEdit({close}) {
    const user = useSelector((state) => state.user);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const hundleSubmit = (e) => {
        e.preventDefault()
    }

    const hundleUploadProfilePhoto = async (e) => {
        const file = e.target.files[0];
        if(!file){
            return
        }

        const formData = new FormData();
        formData.append("avatar", file);
        try {
            setLoading(true)
            const response = await Axios({
                ...Api_endpoints.uploadAvatar,
                data: formData
            })
            const { data : responseData}  = response
            console.log("response from upload avatar", responseData);
            if(responseData.success){
                toast.success(responseData.message)
                const userData = await fetchUserDetail()
                dispatch(updateAvatar(responseData.data.avatar))
                close()
            }
            
        } catch (error) {
           AxiosToastError(error)
        } finally{
            setLoading(false)
        }
    }
    return (
        <section className="fixed top-0 left-0 right-0 bottom-0 bg-neutral-900 bg-opacity-60 p-4  flex flex-col items-center justify-center">
            <div className="bg-white p-4 max-w-sm w-full rounded flex flex-col items-center justify-center">
                <button onClick={close} className="text-neutral-800 w-fit block ml-auto">
                    <IoClose size={20}/>
                </button>

                  <div className="w-20 h-20 bg-red-500 rounded-full overflow-hidden flex items-center justify-center drop-shadow-lg">
                        {user.avatar ? (
                          <img
                           src={user.avatar}
                           alt={user.name}
                           className="w-full h-full"
                          />
                        ) : (
                          <FaRegUserCircle size={60} />
                        )}
                      </div>
                      <form onSubmit={hundleSubmit}>
                        <label htmlFor="uploadProfile">
                            <div className="text-sm min-w-20 border border-primary-100 hover:border-primary-200 hover:bg-primary-200 mt-3 px-3 py-1">
                                {
                                    loading ? "Loading..." : "Upload"
                                }
                            </div>
                            <input onChange={hundleUploadProfilePhoto} type="file" id="uploadProfile" className="hidden" />
                        </label>
                      </form>
            </div>
        </section>
    );
}

export default UserProfileAvatarEdit;