import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { valideURLConvert } from "../utils/convertUrl";
import AxiosToastError from "../utils/Axios-toast-error";
import { Axios } from "../utils/Axios";
import ApiEndpoints from "../common/api-details";
import CardLoading from "./cardLoading";
import CardProduct from "./cardProduct";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

function CardWiseProductDisplay({ id, name }) {
  const subCategoryData = useSelector((state) => state.product.allSubCategory);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const loadingCardNumber = new Array(6).fill(null);
  const containerRef = useRef();

  const fetchCategoryWiseProduct = async () => {
    try {
      setLoading(true);
      const response = await Axios({
        ...ApiEndpoints.getProductByCategory,
        data: { id },
      });

      const { data: responseData } = response;

      if (responseData.success) {
        setData(responseData.data);
      }
    } catch (error) {
      console.error("Error fetching category wise products:", error);
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategoryWiseProduct();
  }, []);

  const handleRedirectProductListpage = () => {
    const subcategory = subCategoryData.find((sub) =>
      sub.category.some((c) => c._id == id)
    );
    const url = `/${valideURLConvert(name)}-${id}/${valideURLConvert(
      subcategory?.name
    )}-${subcategory?._id}`;
    return url;
  };

  const handleScrollRight = () => {
    containerRef.current.scrollLeft += 300;
  };

  const handleScrollLeft = () => {
    containerRef.current.scrollLeft -= 300;
  };

  const redirectUrl = handleRedirectProductListpage();

  return (
    <div>
      {/* Header */}
      <div className="container mx-auto flex items-center justify-between p-4 gap-4">
        <h2 className="font-semibold text-lg md:text-xl">{name}</h2>
        <Link
          to={redirectUrl}
          className="text-green-600 hover:text-green-400 whitespace-nowrap"
        >
          See More
        </Link>
      </div>

      {/* Product List with Arrows */}
      <div className="relative flex items-center">
        {/* Scrollable container */}
        <div
          className="flex gap-4 md:gap-6 lg:gap-8 container mx-auto px-4 overflow-x-scroll scrollbar-none scroll-smooth"
          ref={containerRef}
        >
          {(loading || data.length === 0) &&
            loadingCardNumber.map((_, index) => (
              <CardLoading key={"CategorywiseProductDisplayLoading" + index} />
            ))}

          {!loading &&
            data.length > 0 &&
            data.map((p, index) => (
              <CardProduct
                data={p}
                key={p._id + "CategorywiseProductDisplay" + index}
              />
            ))}
        </div>

        {/* Arrows (centered vertically) */}
        <div className="absolute top-1/2 left-0 right-0 transform -translate-y-1/2 hidden lg:flex justify-between px-2 container mx-auto">
          <button
            onClick={handleScrollLeft}
            className="bg-white hover:bg-gray-100 shadow-lg text-xl p-2 rounded-full"
          >
            <FaAngleLeft />
          </button>
          <button
            onClick={handleScrollRight}
            className="bg-white hover:bg-gray-100 shadow-lg text-xl p-2 rounded-full"
          >
            <FaAngleRight />
          </button>
        </div>
      </div>
    </div>
  );
}

export default CardWiseProductDisplay;
