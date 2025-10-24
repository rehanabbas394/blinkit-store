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
import { HiOutlineExternalLink } from "react-icons/hi";
import isAdmin from "../utils/isAdmin";

function UserMenu({ close }) {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const hundleLogout = async () => {
    try {
      const response = await Axios({
        ...Api_endpoints.logout,
      });
      console.log("response from logout", response);
      if (response.data.success) {
        if (close) {
          close();
        }
        dispatch(logoutUser());
        localStorage.clear();
        toast.success(response.data.message);
        navigate("/");
      }
    } catch (error) {
      console.log("error while logout", error);
      AxiosToastError(error);
    }
  };

  const hundleClose = () => {
    if (close) {
      close();
    }
  };

  return (
    <div className="max-w-sm mx-auto bg-white shadow-md rounded-lg p-5">
      {/* Header */}
      <div className="font-semibold text-lg text-gray-800">My Account</div>
      <div className="flex items-center gap-2 mt-1 text-sm text-gray-600">
        <span className="max-w-52 text-ellipsis line-clamp-1">
          {user?.firstName} {user?.name || user?.mobile}
        </span>
        <Link
          onClick={hundleClose}
          to={"/dashboard/profile"}
          className="hover:text-primary-200 flex items-center justify-center my-1"
        >
          <span>{user.role==='ADMIN'? "(Admin) ": " (User) "}</span>
          <HiOutlineExternalLink size={15} />
        </Link>
      </div>
      <div className="max-w-52 text-ellipsis line-clamp-1 text-sm text-gray-500">
        {user?.email}
      </div>

      <hr className="my-3" />

      {/* Links */}
      <div className="grid gap-2">
        {isAdmin(user.role) && (
          <Link
            onClick={hundleClose}
            to={"/dashboard/category"}
            className="px-3 py-2 rounded-md text-sm text-gray-700 hover:bg-gray-100 transition"
          >
            Category
          </Link>
        )}

        {isAdmin(user.role) && (
          <Link
            onClick={hundleClose}
            to={"/dashboard/sub-category"}
            className="px-3 py-2 rounded-md text-sm text-gray-700 hover:bg-gray-100 transition"
          >
            Sub Category
          </Link>
        )}

        {isAdmin(user.role) && (
          <Link
            onClick={hundleClose}
            to={"/dashboard/upload-product"}
            className="px-3 py-2 rounded-md text-sm text-gray-700 hover:bg-gray-100 transition"
          >
            Upload Product
          </Link>
        )}

        {isAdmin(user.role) && (
          <Link
            onClick={hundleClose}
            to={"/dashboard/products"}
            className="px-3 py-2 rounded-md text-sm text-gray-700 hover:bg-gray-100 transition"
          >
            Product
          </Link>
        )}

        <Link
          onClick={hundleClose}
          to={"/dashboard/myorders"}
          className="px-3 py-2 rounded-md text-sm text-gray-700 hover:bg-gray-100 transition"
        >
          My Orders
        </Link>
        <Link
          onClick={hundleClose}
          to={"/dashboard/address"}
          className="px-3 py-2 rounded-md text-sm text-gray-700 hover:bg-gray-100 transition"
        >
          Add Address
        </Link>
        <button
          onClick={hundleLogout}
          className="px-3 py-2 rounded-md text-sm text-red-600 font-medium hover:bg-red-50 text-left transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default UserMenu;
