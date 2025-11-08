import React from "react";
import banner from '../assets/banner.jpg'
import bannerMobile from '../assets/banner-mobile.jpg'
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { valideURLConvert } from "../utils/convertUrl";

export const Home = () =>{
    const loadingCategory = useSelector(state => state.product.loadingCategory)
    const categoryData = useSelector(state => state.product.allCategory)
    const subCategoryData = useSelector(state => state.product.allSubCategory)
    const navigate = useNavigate()

    const handleRedirectProductListpage = (categoryId,categoryName) => {

        const subCategory = subCategoryData.find(subCat => {
            console.log("subCat",subCat)
            const filterData = subCat.category.some(cat => {
               return cat._id === categoryId
            })
            return filterData ? true : null
        })
        const url = `/${valideURLConvert(categoryName)}-${categoryId}/${valideURLConvert(subCategory.name)}-${subCategory._id}`
        console.log("url",url)
        navigate(url)
    }

    return(
        <section className="bg-white">
            <div className="container mx-auto">
                <div className={`w-full h-full min-h-48 bg-blue-100 rounded ${!banner && "animate-pulse my-2"}`}>
                    <img src={banner} alt="banner image" 
                    className="w-full h-full hidden lg:block"
                    />
                    <img src={bannerMobile} alt="banner image" 
                    className="w-full h-full lg:hidden"
                    />
                </div>
            </div>

            <div className="container mx-auto px-4 my-2 grid grid-cols-5 md:grid-cols-8 lg:grid-cols-10 gap-3">
                {
                    loadingCategory ? (
                        new Array(12).fill(null).map((categoryData,index) => {
                            return (
                                <div key={index+"loadingcategory"} className="bg-white rounded p-4 min-h-36 grid gap-2 shadow animate-pulse">
                                    <div className="bg-blue-100 min-h-24 rounded"></div>
                                    <div className="bg-blue-100 h-8 rounded"></div>
                                </div>
                            )
                        })
                    ) : (
                        categoryData.map((cat,index) => {
                            return (
                                <div key={cat._id+"displayImage"} className='w-full h-full ' onClick={()=> handleRedirectProductListpage(cat._id,cat.name)}>
                                    <div>
                                        <img src={cat.image} alt="category image" 
                                         className="w-full h-24 object-scale-down rounded cursor-pointer"
                                        />
                                    </div>
                                </div>
                            )
                        })
                    )
                }
            </div>

            {/* display listing */}


        </section>
    )
}