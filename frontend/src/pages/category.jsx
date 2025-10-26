import { useState, useEffect } from "react";
import NoData from "../component/noData";
import { Axios } from "../utils/Axios";
import Api_endpoints from "../common/api-details";
import AxiosToastError from "../utils/Axios-toast-error";
import Loading from "../component/loading";
import EditCategory from "../component/editCategory";
import CofirmBox from "../component/confirmBox";
import toast from "react-hot-toast";
import AddCategoryProduct from "./addCategory";

function Category() {
    const [openAddCategory, setOpenAddCategory ] = useState(false);
    const [loading, setLoading] = useState(false);
    const [categoriesData, setCategoriesData] = useState([]);
    const [openEdit, setOpenEdit] = useState(false);
    const [editData,setEditData] = useState({
        name : "",
        image : "",
    })
    const [openConfimBoxDelete,setOpenConfirmBoxDelete] = useState(false)
    const [deleteCategory,setDeleteCategory] = useState({
        _id : ""
    })

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

    const hundleDeleteCategory = async()=>{
        try {
            setLoading(true);
            const response = await Axios({
                ...Api_endpoints.deleteCategory,
                data : deleteCategory
            });
            
            const { data: responseData } = response;
            
            if (responseData.success) {
                toast.success(responseData.message);
                setOpenConfirmBoxDelete(false);
                // Wait a brief moment before refreshing the list
                await new Promise(resolve => setTimeout(resolve, 100));
                await fetchCategory();
            } else {
                toast.error(responseData.message || 'Failed to delete category');
            }
        } catch (error) {
            AxiosToastError(error);
        } finally {
            setLoading(false);
        }
    }


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
                                <div className="items-center h-9 flex gap-2 mt-2">
                                    <button className="flex-1 bg-green-100 hover:bg-green-300 text-green-600 font-medium py-1  px-2 rounded"
                                    onClick={()=> {
                                        setOpenEdit(true)
                                        setEditData(category)}
                                    }
                                    >
                                        Edit
                                    </button>
                                    <button className="flex-1 bg-red-100 hover:bg-red-300 text-green-600 font-medium py-1  px-2 rounded"
                                    onClick={()=>{
                                        setOpenConfirmBoxDelete(true)
                                        setDeleteCategory(category)
                                    }}
                                    >
                                        Delete
                                    </button>
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
                openEdit && (
                    <EditCategory data={editData} fetchData={fetchCategory} close={()=> setOpenEdit(false)}/>
                )
            }
            {
                openConfimBoxDelete && (
                    <CofirmBox 
                        close={()=> setOpenConfirmBoxDelete(false)}
                        cancel={()=> setOpenConfirmBoxDelete(false)}
                        confirm= {hundleDeleteCategory}
                    />
                )
            }

            {
                openAddCategory && (
                    <AddCategoryProduct fetchData={fetchCategory} close ={()=> setOpenAddCategory(false)}/>
                )
            }
        </section>
    ) 
}

export default Category;