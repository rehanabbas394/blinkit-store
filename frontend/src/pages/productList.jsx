import { use, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { valideURLConvert } from "../utils/convertUrl";
import { Axios } from "../utils/Axios";
import ApiEndpoints from "../common/api-details";
import AxiosToastError from "../utils/Axios-toast-error";
import CardProduct from "../component/cardProduct";



function ProductListPage() {
    const [data,setData] = useState([]);
    const [page, setPage] = useState(1)
    const [loading, setLoading] = useState(false)
    const [totalPage, setTotalPage] = useState(1)
    const AllSubCategory = useSelector(state => state.product.allSubCategory);
    const [DisplayCategory,setDisplayCategory] = useState([]);
    const param = useParams();

    const categoryId = param.category.split("-").slice(-1)[0]
    const categoryName = param.category.split("-").slice(0,-1).join("-")
    const subCategoryId = param.subCategory.split("-").slice(-1)[0]
    const subCategoryName = param.subCategory.split("-").slice(0,-1).join(" ")
    
    const fetchProductData = async() => {
        try {
            setLoading(true)
            const response = await Axios({
                ...ApiEndpoints.getProductByCategoryAndSubCategory,
                data: {
                    categoryId: categoryId,
                    subCategoryId: subCategoryId,
                    page: page,
                    limit: 10
                }
            })
            const { data : responseData } = response;
            console.log("responseData in product list page",responseData)
            if(responseData.success){
                if (responseData.page == 1) {
                    setData(responseData.data)
                 } else {
                    setData([...data, ...responseData.data])
                }
                setTotalPage(responseData.data.totalPages)
            }
        } catch (error) {
            console.error("Error fetching product data:", error);
            AxiosToastError(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchProductData();
    },[param])

    useEffect(() => {
        const subcategory = AllSubCategory.filter(sub => {
            const filterData = sub.category.some(cat => {
                return cat._id === categoryId
            })
            return filterData ? true : null
        })
        setDisplayCategory(subcategory);

    },[param,AllSubCategory])
    return (
       <section className="sticky top-24 lg:top-20">
        {/* sidebar for subcategory */}
        <div className="container sticky top-24 bg-white py-2 mx-auto grid grid-cols-[100px_1fr] gap-2 md:grid-cols-[200px_1fr] lg:grid-cols-[250px_1fr]">
            <div className=" min-h-[88vh] max-h-[88vh] overflow-y-scroll py-2 grid gap-2 shadow-md scrollbarCustom">
                <h2 className="text-lg font-semibold text-gray-800 mb-3 px-2">
                    Subcategories
                </h2>
                {
                    DisplayCategory.map(subCat => {
                        const url = `/${valideURLConvert(categoryName)}-${categoryId}/${valideURLConvert(subCat.name)}-${subCat._id}`;
                        return(
                            <Link to={url} className={`w-full p-2 lg:flex item-center lg:w-full lg:h-20 box-border border-b lg:gap-4 cursor-pointer hover:bg-gray-100 rounded mb-2
                                ${subCategoryId === subCat._id ? "bg-gray-200" : "" }`}>
                                <div className="w-fit max-w-28 mx-auto lg:mx-0 bg-white rounded  box-border">
                                    <img 
                                        src={subCat.image} 
                                        alt={subCat.name} 
                                        className="w- lg:w-12 lg:h-16 h-full object-scale-down"

                                    />
                                </div>
                                <div className="-mt-6 lg:mt-3 text-xs text-center lg:text-left lg:text-base">{subCat?.name}</div>
                            </Link>
                        )
                    })
                }
            </div>


            <div className="sticky top-20">
               <div className="bg-white shadow-md p-4 z-10">
                <h2 className="font-semibold">{subCategoryName}</h2>
               </div>

               <div>
                  <div className="min-h-[80vh] max-h-[88vh] overflow-y-auto py-2 relative">
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 p-4 gap-4">
                        {loading ? (
                            Array(4).fill(null).map((_, index) => (
                                <div key={`skeleton-${index}`} className="animate-pulse bg-gray-100 h-32 rounded-md"></div>
                            ))
                        ) : !data || data.length === 0 ? (
                            <div className="text-center py-8">
                                <p className="text-gray-500">No products found</p>
                            </div>
                        ) : (
                            data.map((product, index) => (
                                <CardProduct 
                                    data={product} 
                                    key={product._id + "productListPage" + index}
                                />
                            ))
                        )}
                    </div>
                  </div>
               </div>
            </div>
        </div>
       </section>
    )
}

export default ProductListPage;