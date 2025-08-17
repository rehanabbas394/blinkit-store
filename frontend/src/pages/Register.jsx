import React, { useState } from "react";
import { FaRegEyeSlash } from "react-icons/fa6";
import { FaRegEye } from "react-icons/fa6";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import AxiosToastError from "../utils/Axios-toast-error";
import { Axios } from "../utils/Axios";
import Api_endpoints from "../common/api-details";

export const Register = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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

    if (data.password !== data.confirmPassword) {
      console.log("Password and Confirm Password must be same");
      toast.error("password and confirm password must be same");
      return;
    }
    console.log("api calling ===>", data)
    try {
      const resp = await Axios({
        ...Api_endpoints.register,
        data: data,
      });
      console.log(resp.data);
      if (resp.data.error) {
        console.log(resp.data.error);
        toast.error(resp.data.message);
      }

      if (resp.data.success) {
        toast.success(resp.data.message);
        console.log(resp.data.message)
        setData({
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
        navigate("/login");
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
          {/* name field */}
          <div className="grid gap-1">
            <label htmlFor="name">Name :</label>
            <input
              type="text"
              id="name"
              autoFocus
              name="name"
              value={data.name}
              onChange={hundleChange}
              placeholder="Enter your Name"
              className="bg-blue-50 p-2 rounded border outline-none focus:border-primary-200"
            />
          </div>
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
          {/* confirm password */}
          <div className="grid gap-1">
            <label htmlFor="confirmPassword">Confirm Password :</label>
            <div className="flex items-center focus-within:border-primary-200 rounded bg-blue-50 p-2 border">
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                value={data.confirmPassword}
                onChange={hundleChange}
                placeholder="Enter your Confrim Password"
                className="w-full outline-none bg-blue-50"
              />
              <div
                onClick={() => setShowConfirmPassword((preve1) => !preve1)}
                className="cursor-pointer"
              >
                {showConfirmPassword ? <FaRegEye /> : <FaRegEyeSlash />}
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
            Register
          </button>
        </form>
        <p>
          Already have account ?{" "}
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
