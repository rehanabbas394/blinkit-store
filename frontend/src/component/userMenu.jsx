import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../store/userSlice";
import toast from "react-hot-toast";
import { Axios } from "../utils/Axios";
import Api_endpoints from "../common/api-details";
import AxiosToastError from "../utils/Axios-toast-error";

function UserMenu() {
  const user = useSelector((state) => state.user);
  console.log("user from usermenu", user);
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const hundleLogout = async () => {
   try{
       const response = await Axios({
        ...Api_endpoints.logout
       })
       console.log("response from logout", response)
       if(response.data.success) {
        dispatch(logoutUser())
        localStorage.clear()
        toast.success(response.data.message)
        navigate("/")
       }
   } catch(error){
    console.log("error while logout", error)
    AxiosToastError(error)
   }

  }

  return (
    <div className="max-w-sm mx-auto bg-white shadow-md rounded-lg p-5">
      {/* Header */}
      <div className="font-semibold text-lg text-gray-800">My Account</div>
      <div className="mt-1 text-sm text-gray-600">
        {user?.firstName} {user?.name || user?.mobile}
      </div>
      <div className="text-sm text-gray-500">{user?.email}</div>

      <hr className="my-3" />

      {/* Links */}
      <div className="grid gap-2">
        <Link
          to=""
          className="px-3 py-2 rounded-md text-sm text-gray-700 hover:bg-gray-100 transition"
        >
          My Orders
        </Link>
        <Link
          to=""
          className="px-3 py-2 rounded-md text-sm text-gray-700 hover:bg-gray-100 transition"
        >
          Add Address
        </Link>
        <button onClick={hundleLogout} className="px-3 py-2 rounded-md text-sm text-red-600 font-medium hover:bg-red-50 text-left transition">
          Logout
        </button>
      </div>
    </div>
  );
}

export default UserMenu;
