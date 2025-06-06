import React, { useState } from "react";
import { FaRegEyeSlash } from "react-icons/fa6";
import { FaRegEye } from "react-icons/fa6";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import AxiosToastError from "../utils/Axios-toast-error";
import { Axios } from "../utils/Axios";
import Api_endpoints from "../common/api-details";

export const Login = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const hundleChange = (e) => {
    const { name, value } = e.target;

    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const valideValue = Object.values(data).every((el) => el);

  const hundleFormSubmit = async (e) => {
    e.preventDefault();

    console.log("api calling ===>", data)
    try {
      const resp = await Axios({
        ...Api_endpoints.login,
        data: data,
      });
      console.log(resp.data);
      if (resp.data.error) {
        console.log(resp.data.error);
        toast.error(resp.data.message);
      }

      if (resp.data.success) {
        toast.success(resp.data.message);
        console.log
        localStorage.setItem("accessToken", resp.data.data?.accesstoken)
        localStorage.setItem("refreshToken", resp.data.data?.refreshToken)
        console.log(resp.data.message)
        setData({
          email: "",
          password: "",
        });
        navigate("/");
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  return (
    <section className="w-full container mx-auto px-2">
      <div className="bg-white mx-auto mt-4 p-7 rounded w-full max-w-lg gap-2">
        <p className="text-semibold">Well come to Binkeyit App</p>
        <form action="" onSubmit={hundleFormSubmit} className="grid gap-4 mt-6">

          {/* email field */}
          <div className="grid gap-1">
            <label htmlFor="email">Email :</label>
            <input
              type="email"
              id="email"
              name="email"
              value={data.email}
              onChange={hundleChange}
              placeholder="Enter your Email"
              className="bg-blue-50 p-2 rounded border outline-none focus:border-primary-200"
            />
          </div>
          {/* password field */}
          <div className="grid gap-1">
            <label htmlFor="password">Password :</label>
            <div className="flex items-center focus-within:border-primary-200 rounded bg-blue-50 p-2 border">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={data.password}
                onChange={hundleChange}
                placeholder="Enter your Password"
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
          <Link to={"/forgot-password"} className="block ml-auto hover:text-primary-200">Forgot Password</Link>
        
          {/* end here fields */}
          {/* register button */}
          <button
            disabled={!valideValue}
            className={` ${
              valideValue ? "bg-green-800 hover:bg-green-700" : "bg-gray-500"
            }    text-white py-2 rounded font-semibold my-3 tracking-wide`}
          >
            Login
          </button>
        </form>
        <p>
          Don't have Account ?{" "}
          <Link
            to={"/register"}
            className="font-semibold text-green-700 hover:text-green-800"
          >
            Register
          </Link>
        </p>
      </div>
    </section>
  );
};
