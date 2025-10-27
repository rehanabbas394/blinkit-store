import React, { useEffect, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import Loading from "../component/loading"
import AxiosToastError from "../utils/Axios-toast-error"
import { Axios } from '../utils/Axios'
import Api_endpoints from "../common/api-details";
import ProductCardAdmin from "../component/ProductCardAdmin";

function AdminProducts() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [productData, setProductData] = useState([]);
  const [totalPageCount,setTotalPageCount] = useState(1)


  async function fetchProducts() {
    try {
        setLoading(true);
        const response = await Axios({
            ...Api_endpoints.getProduct,
            data: {
                page: page,
                limit: 12,
                search: search
            }
        })
        const {data: responseData} = response;
        // console.log("responseData ",responseData);
        if(responseData?.success){
          setTotalPageCount(responseData.totalNoPage)
          setProductData(responseData.data)
        }
        
    } catch (error) {
        console.error("Error fetching products:", error);
        AxiosToastError(error); 
    }
    finally{
        setLoading(false);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, [page]);

  const hundleSearchChange = (e) => {
    const { value } = e.target;
    setPage(1);
    setSearch(value);
  };

  const hundleNextChange = (e) => {
    if(page !== totalPageCount){
        setPage(prev => prev + 1);
    }
  };

   const handlePreviousChange = ()=>{
    if(page > 1){
      setPage(preve => preve - 1)
    }
  }

 console.log("productData ",productData);
  return (
    <section>
      <div className="bg-white shadow-md p-2 flex items-center justify-between gap-4">
        <h2 className="font-semibold">Product</h2>
        <div className="flex items-center gap-3 border focus-within:border-primary-200 p-2 rounded bg-slate-100 ">
          <IoSearchOutline size={25} />
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={hundleSearchChange}
            className="h-full w-full outline-none bg-transparent"
          />
        </div>
      </div>
      {loading && <Loading />}

      {/* map data */}
      <div className="p-4 bg-blue-50">
        <div className="min-h-[55vh]">
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {
                  productData.map((p,index)=>{
                    return(
                      <ProductCardAdmin data={p} fetchData={fetchProducts} />
                    )
                  })
                }
            </div>
        </div>
        <div className="flex justify-betweeen my-4">
            <button onClick={handlePreviousChange} className="border border-primary-200 px-4 py-1 hover:bg-primary-200">Previous</button>
            <button className='w-full bg-slate-100'>{page}/{totalPageCount}</button>
            <button onClick={hundleNextChange} className="border border-primary-200 px-4 py-1 hover:bg-primary-200">Next</button>
        </div>
      </div>

    </section>
  );
}

export default AdminProducts;
