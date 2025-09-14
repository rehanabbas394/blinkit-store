import React, {useState} from "react";
import logo from '../assets/logo.png'
import {Search } from './search'
import { Link, useLocation, useNavigate } from "react-router-dom";
import useMobile from "../hooks/useMobile";
import { FaRegCircleUser } from "react-icons/fa6";
import { BsCart4 } from "react-icons/bs";
import { useSelector } from "react-redux";
import { GoTriangleDown, GoTriangleUp  } from "react-icons/go";
import UserMenu from "./userMenu";

export const Header = () =>{
    const [isMobile] = useMobile()
    const location = useLocation()
    const navigate  = useNavigate()
    const isSearchPage = location.pathname === "/search"
    const user = useSelector(state=> state.user)
    console.log("user from header", user)

    const [ openUserMenu, SetOpenUserMenu ] = useState(false)

    const RedirectTologinPage = ()=>{
        console.log("navigat to login page")
        navigate("/login")
    }
    
    // const hundleMobileUser = () => {

    // }
    const closeUserMenu = () => {
       SetOpenUserMenu(false)
    }
    return(
       <header className="h-20 lg:h-24 lg:shadow-md sticky top-0 z-40  flex flex-col justify-center gap-1 bg-white">
        {
            !(isMobile && isSearchPage) && (
                // when i was on desktop
                 <div className="container flex justify-between items-center mx-auto px-2">
            {/* logo code */}
            <Link to={"/"} className="h-full ">
                {/* for desktop device */}
               <img className="hidden lg:block" 
               src={logo} 
               width={170}
               height={60}
               alt="logo image" 
               />

               {/* For mobile device */}
               <img 
                src={logo} 
                alt="logo mobile imge"
                width={120}
                height={60}
                className="lg:hidden"
                />
            </Link>
            {/* search code */}
            <div className="hidden lg:block">
               <Search/>
            </div>
            {/* login register and add to card */}
            <div className="">
                {/* for mobile version */}
                <button className="lg:hidden text-neutral-600">
                    < FaRegCircleUser size={26}/>
                </button>

                {/* for desktop screen */}
                <div className=" hidden lg:flex items-center gap-10 ">
                    {
                        user?._id ? (
                            <div className="relative" >
                                <div onClick={()=> SetOpenUserMenu( prev => !prev )} className="flex items-center gap-1" >
                                    <p>Account</p>
                                    {
                                        openUserMenu ? (
                                            <GoTriangleUp size= {25} />
                                        ) : (
                                            <GoTriangleDown size={25} />
                                        )
                                    }
                                </div>
                                {openUserMenu && (
                                    <div className="absolute top-[3.5rem] right-0 z-50">
                                        <div className="bg-white rounded-lg p-4 min-w-[13rem] shadow-lg border">
                                            <UserMenu close = {closeUserMenu} />
                                         </div>
                                    </div>
                                )}

                            </div>
                        ) : (
                            <button onClick={RedirectTologinPage} className="text-lg px-2"> Login </button>
                        )
                    }
                    <button className="flex items-center text-white rounded gap-2 bg-green-800 hover:bg-green-700 px-4 py-3">
                        {/* add to card icon */}
                        <div className="animate-bounce">
                            <BsCart4 size={28} />
                        </div>
                        <div className="font-semibold">
                           <p> My Cart </p> 
                        </div>
                    </button>
                </div>
            </div>
        </div>

            ) 
        }

        <div className="container mx-auto px-2  lg:hidden">
                   <Search/>
                </div>
       


        
       </header>
    )
}