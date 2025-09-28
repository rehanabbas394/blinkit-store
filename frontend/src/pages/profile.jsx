import {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaRegUserCircle } from "react-icons/fa";
import UserProfileAvatarEdit from "../component/UserProfileAvatarEdit";
import AxiosToastError from "../utils/Axios-toast-error";
import { Axios } from "../utils/Axios";
import Api_endpoints from "../common/api-details";
import  fetchUserDetail  from "../utils/fetchUserDetail"
import toast from "react-hot-toast";

function Profile() {
  const user = useSelector((state) => state.user);
  const [openProfileAvatarEdit, setOpenProfileAvatarEdit] = useState(false);
  const [userData, setUserData] = useState({
    name: user.name,
    email: user.email,
    mobile: user.mobile
  })
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setUserData({
      name: user.name,
      email: user.email,
      mobile: user.mobile
    })
  }, [user]);

  const hundleOnChange = (e) => {
     const { name, value } = e.target;

     setUserData((prevData) => {
      return {
        ...prevData,
        [name]: value
      }
     })
  }

  const hundleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true)
      const response = await Axios({
        ...Api_endpoints.updateUserDetails,
        data: userData
      })
      const { data: responseData } = response
      if (responseData.success) {
        toast.success(responseData.message)
        const userData = await fetchUserDetail()
        dispatch(updateUser(userData.data))
      }
    } catch (error) {
      AxiosToastError(error)
    } finally {
      setLoading(false)
    }

  }

  return (
    <div className="p-4 max-w-lg mx-auto">
      {/* profile photo edit */}
      <div className="w-20 h-20 mx-auto bg-red-500 rounded-full overflow-hidden flex items-center justify-center drop-shadow-lg">
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
        <button onClick={()=> setOpenProfileAvatarEdit(true)} className="mx-auto block font-semibold text-sm min-w-20 border border-primary-100 hover:border-primary-200 hover:bg-primary-200 mt-3 px-3 py-1 ">Edit</button>
        {
            openProfileAvatarEdit && (
                <UserProfileAvatarEdit close = {()=> setOpenProfileAvatarEdit(false)} />
            )
        }
        {/* profile data edit */}
        <form onSubmit={hundleSubmit} className="grid gap-4 my-4">
          <div className="grid">
            <label htmlFor="name">Name:</label>
            <input
             type="text"
             placeholder="Enter your name"
             id="name"
             name="name"
             value={userData.name}
             onChange={hundleOnChange}
             required
             className="border p-2 bg-blue-50 outline-none focus-within: border-primary-200 rounded"
            />
          </div>

            <div className="grid">
            <label htmlFor="email">Email:</label>
            <input
             type="email"
             placeholder="Enter your email"
             id="email"
             name="email"
             value={userData.email}
             onChange={hundleOnChange}
             required
             className=" border p-2 bg-blue-50 outline-none focus-within: border-primary-200 rounded"
            />
          </div>

            <div className="grid">
            <label htmlFor="mobile">Mobile:</label>
            <input
             type="text"
             id="mobile"
             name="mobile"
             value={userData.mobile}
             onChange={hundleOnChange}
             required
             className=" border p-2 bg-blue-50 outline-none focus-within: border-primary-200 rounded"
            />

          </div>
            <button className="border px-4 py-2 font-semibold hover:bg-primary-100 border-primary-100  rounded">
              {
                loading ? "Loading..." : "Submit"
              }
            </button>
           
        </form>
    </div>
  );
}

export default Profile;
