import React, { useRef, useState, useEffect } from "react";
import { FaRegEyeSlash } from "react-icons/fa6";
import { FaRegEye } from "react-icons/fa6";
import toast from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import AxiosToastError from "../utils/Axios-toast-error";
import { Axios } from "../utils/Axios";
import Api_endpoints from "../common/api-details";

export const OtpVerfication = () => {
  const [data, setData] = useState([ "","","","","","" ]);
  const inputRef = useRef([])
  const navigate = useNavigate();
  const location = useLocation()
  

  const valideValue = Object.values(data).every((el) => el);

  useEffect(()=>{
        if(!location?.state?.email){
            navigate("/forgot-password")
        }
    },[])

  const hundleFormSubmit = async (e) => {
    e.preventDefault();

    console.log("api calling ===>", data)
    try {
      const resp = await Axios({
        ...Api_endpoints.forgot_password_otp_verification,
        data: {
            otp: data.join(""),
            email: location?.state?.email
        }
      });
      console.log(resp.data);


      if (resp.data.error) {
        console.log(resp.data.error);
        toast.error(resp.data.message);
      }

      if (resp.data.success) {
        toast.success(resp.data.message);
        console.log(resp.data.message)
        setData(["","","","","",""])

        navigate("/reset-password",{
            state: {
                data: resp.data,
                email: location?.state?.email
            }
        });
      }
    } catch (error) {
        console.log("error",error)
        AxiosToastError(error);
    }
  };

  return (
    <section className="w-full container mx-auto px-2">
      <div className="bg-white mx-auto mt-4 p-7 rounded w-full max-w-lg gap-2">
        <p className="text-bold"> Binkeyit OTP Verification</p>
        <form action="" onSubmit={hundleFormSubmit} className="grid gap-4 mt-6">

          {/* email field */}
          <div className="grid gap-1">
            <label htmlFor="otp">Enter Your OTP :</label>
            <div className="flex gap-2 items-center justify-between mt-3">
                {
                    data.map((element, index)=>{
                        return ( 
                            <input
                            key={"otp"+index}
                            id="otp"
                            type="text"
                            ref={(ref)=>{
                                inputRef.current[index] = ref
                                return ref
                            }}
                            value={data[index]}
                            onChange={(e)=>{
                                const value = e.target.value
                                console.log(value)

                                const newData = [...data]
                                newData[index] = value
                                setData(newData)

                                 if(value && index < 5){
                                    inputRef.current[index+1].focus()
                                }
                            }}
                            maxLength={1}
                            className="bg-blue-50 p-2 w-full max-w-16 rounded border outline-none text-center font-semibold focus:border-primary-200"
                            />

                        )
                    })
                }
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
            Verify Otp
          </button>
        </form>
        <p>
          Did'nt received otp ?{" "}
          <Link
            to={"/forgot-password"}
            className="font-semibold text-green-700 hover:text-green-800"
          >
            Resend
          </Link>
        </p>
      </div>
    </section>
  );
};
