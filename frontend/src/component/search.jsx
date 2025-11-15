import React, { useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";
import { TypeAnimation } from "react-type-animation";
import { useNavigate, useLocation, Link } from "react-router-dom";
import useMobile from "../hooks/useMobile";
import { FaArrowLeft } from "react-icons/fa";


export const Search = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSearchPage, setisSearchPage] = useState(false);
  const [isMobile] = useMobile();

  useEffect(() => {
    const isSearch = location.pathname === "/search";
    setisSearchPage(isSearch);
  }, [location]);

  const RedirectToSearchPage = () => {
    navigate("/search");
  };

  const hundleSearchChange = (e) => {
    const value = e.target.value;
    const url = `/search?q=${value}`;
    navigate(url);
  };
  return (
    <div className="w-full min-w-[300px] lg:min-w-[420px] border  h-11 lg:h-12 rounded-lg overflow-hidden flex items-center text-neutral-500 group focus-within:border-primary-200">
      <div>
        {
        (isMobile && isSearchPage) ? (
          // when i was on mobile and search page
          <Link to={"/"} className='flex justify-center items-center h-full p-2 m-1 group-focus-within:text-primary-200 bg-white rounded-full shadow-md'>
              <FaArrowLeft size={20}/>
          </Link>
        ) : (
          <button className="h-full p-3 flex items-center justify-center group-focus-within:text-primary-200">
            <IoSearch size={22} />
          </button>
        )
        }
      </div>

      <div className="w-full h-full">
        {!isSearchPage ? (
          // not in the search page
          <div
            onClick={RedirectToSearchPage}
            className="w-full h-full flex items-center"
          >
            <TypeAnimation
              sequence={[
                // Same substring at the start will only be typed out once, initially
                'Search "milk"',
                1000, // wait 1s before replacing "Mice" with "Hamsters"
                'Search "bread"',
                1000,
                'Search "sugar"',
                1000,
                'Search "panner"',
                1000,
                'Search "chocolate"',
                1000,
                'Search "curd"',
                1000,
                'Search "rice"',
                1000,
                'Search "egg"',
                1000,
                'Search "chips"',
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
            />
          </div>
        ) : (
          // in the search oage
          <div className="w-full h-full">
            <input
              type="text"
              placeholder="Search for atta dal and more."
              autoFocus
              className="bg-transparent w-full h-full outline-none"
              onChange={hundleSearchChange}
            />
          </div>
        )}
      </div>
    </div>
  );
};
