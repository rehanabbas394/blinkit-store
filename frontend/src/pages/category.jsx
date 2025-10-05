import { useState, useEffect } from "react";
import UploadProduct from "./upload-product";
import NoData from "../component/noData";
import { Axios } from "../utils/Axios";
import Api_endpoints from "../common/api-details";
import AxiosToastError from "../utils/Axios-toast-error";
import Loading from "../component/loading";

function Category() {
    const [openAddCategory, setOpenAddCategory ] = useState(false);
    const [loading, setLoading] = useState(false);
    const [categoriesData, setCategoriesData] = useState([]);

    const fetchCategory = async()=>{
        try {
            setLoading(true)
            const response = await Axios({
                ...Api_endpoints.getCategory
            })
            const { data : responseData } = response
            console.log("response from get category", responseData);

            if(responseData.success){
                setCategoriesData(responseData.data)
            }
        } catch (error) {
            // AxiosToastError(error)
        }finally{
            setLoading(false)
        }
    }

    useEffect(()=>{
        fetchCategory()
    },[])


    return (
        <section>
            <div className="bg-white shadow-md p-2 flex items-center justify-between">
                <h2 className="font-semibold">Category</h2>
                <button onClick={()=> setOpenAddCategory(true)} className="text-md border border-primary-200 hover:bg-primary-200 rounded px-3 py-1">Add Category</button>
            </div>
            {
                !categoriesData[0] && !loading && (
                    <NoData/>
                )
            }
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 p-4 gap-4 mt-4">
                {
                    categoriesData.map((category,index)=>{
                        return (
                            <div key={index} className="border p-2 shadow-md rounded flex flex-col items-center">
                                <img
                                alt={category.name}
                                src={category.image}
                                className="w-full object-scale-down"
                                />
                                <p className="text-center text-sm font-bold mt-1">{category.name}</p>
                                <div>
                                    <button>Edit</button>
                                    <button>Delete</button>
                                </div>

                            </div>
                        )
                    })
                }
            </div>
            {
            loading && (
                <Loading/>
            )
        }

            {
                openAddCategory && (
                    <UploadProduct fetchData={fetchCategory} close ={()=> setOpenAddCategory(false)}/>
                )
            }
        </section>
    ) 
}

export default Category;