import React from "react";
import logo from '../assets/logo.png'
import {Search } from './search'

export const Header = () =>{
    return(
       <header className="h-20 lg:h-24 lg:shadow-md sticky top-0 z-40  flex flex-col justify-center gap-1 bg-white">
        <div className="container flex justify-between items-center mx-auto px-2">
            {/* logo code */}
            <div className="h-full ">
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
            </div>
            {/* search code */}
            <div>
               <Search/>
            </div>
            {/* login register and add to card */}
            <div>
                login and card
            </div>
        </div>
        
       </header>
    )
}