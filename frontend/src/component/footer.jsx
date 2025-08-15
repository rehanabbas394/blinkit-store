import React from "react";
import { FaFacebook } from 'react-icons/fa'
import { FaInstagram } from 'react-icons/fa'
import { FaLinkedin } from 'react-icons/fa'


export const Footer = () =>{
    return(
        <footer className= 'border-t'>
            <div className="container mx-auto p-4 flex flex-col  text-center lg:flex-row lg:justify-between gap-2">
                <p> All Rights Reserved 2024</p>
                <div className="flex item-center justify-center gap-4 text-2xl">
                    <a href="" target="_blank" rel="noopener noreferrer" className='hover:text-primary-100'>
                        <FaFacebook/>
                    </a>
                      <a href="" target="_blank" rel="noopener noreferrer" className='hover:text-primary-100'>
                        <FaInstagram/>
                    </a>
                      <a href="" className ='hover:text-primary-100' >
                        <FaLinkedin/>
                    </a>
                </div>
            </div>

        </footer>
    )
}