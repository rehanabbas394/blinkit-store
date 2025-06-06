import React, { useEffect, useState } from "react";
import { FaRegEyeSlash } from "react-icons/fa6";
import { FaRegEye } from "react-icons/fa6";
import toast from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import AxiosToastError from "../utils/Axios-toast-error";
import { Axios } from "../utils/Axios";
import Api_endpoints from "../common/api-details";

export const ResetPassword = () => {
  const [data, setData] = useState({
    email: "rehan.abbas@planlabsolutions.com",
    newPassword: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showconfirmNewPassword, SetShowConfirmNewPassword] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  console.log(location);

  useEffect(() => {
    // if(!location?.state?.data?.success){
    //     navigate("/")
    // }

    // set email
    if (location?.state?.email) {
      setData((prev) => {
        return {
          ...prev,
          email: location?.state?.email,
        };
      });
    }
  }, []);

  const hundleChange = (e) => {
    const { name, value } = e.target;

    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  console.log("data reset password", data);
  const valideValue = Object.values(data).every((el) => el);

  const hundleFormSubmit = async (e) => {
    e.preventDefault();

    // optional
    if(data.newPassword !== data.confirmPassword){
        toast.error(" New Password and confrim Passwort must be same")
    }

    console.log("api calling ===>", data);
    try {
      const resp = await Axios({
        ...Api_endpoints.resetPassword,
        data: data,
      });
      console.log(resp.data);
      if (resp.data.error) {
        console.log(resp.data.error);
        toast.error(resp.data.message);
      }

      if (resp.data.success) {
        toast.success(resp.data.message);
        navigate("/login");

        console.log(resp.data.message);
        setData({
          email: "",
          newPassword: "",
          confirmPassword: "",
        });
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  return (
    <section className="w-full container mx-auto px-2">
      <div className="bg-white mx-auto mt-4 p-7 rounded w-full max-w-lg gap-2">
        <p className="font-semibold">Chnage Password</p>
        <form action="" onSubmit={hundleFormSubmit} className="grid gap-4 mt-6">
          {/* password field */}
          <div className="grid gap-1">
            <label htmlFor="newPassword">New Password :</label>
            <div className="flex items-center focus-within:border-primary-200 rounded bg-blue-50 p-2 border">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="newPassword"
                value={data.newPassword}
                onChange={hundleChange}
                placeholder="Enter your New Password"
                className="w-full outline-none bg-blue-50"
              />
              <div
                onClick={() => setShowPassword((preve) => !preve)}
                className="cursor-pointer"
              >
                {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
              </div>
            </div>
          </div>

          {/* confirm password */}
          <div className="grid gap-1">
            <label htmlFor="confirmPassword">Confirm Password :</label>
            <div className="flex items-center focus-within:border-primary-200 rounded bg-blue-50 p-2 border">
              <input
                type={showconfirmNewPassword ? "text" : "password"}
                id="password"
                name="confirmPassword"
                value={data.confirmPassword}
                onChange={hundleChange}
                placeholder="Enter your Password"
                className="w-full outline-none bg-blue-50"
              />
              <div
                onClick={() => SetShowConfirmNewPassword((preve) => !preve)}
                className="cursor-pointer"
              >
                {showconfirmNewPassword ? <FaRegEye /> : <FaRegEyeSlash />}
              </div>
            </div>
          </div>

          {/* end here fields */}
          {/* register button */}
          <button
            disabled={!valideValue}
            className={` ${
              valideValue ? "bg-green-800 hover:bg-green-700" : "bg-gray-500"
            }    text-white py-2 rounded font-semibold my-3 tracking-wide`}
          >
            Change Password
          </button>
        </form>
        <p>
          Already have Account ?{" "}
          <Link
            to={"/login"}
            className="font-semibold text-green-700 hover:text-green-800"
          >
            Login
          </Link>
        </p>
      </div>
    </section>
  );
};
