import React, {useEffect, useState} from "react";
import Api_endpoints from "../common/api-details";
import { Axios } from "../utils/Axios";
import AxiosToastError from "../utils/Axios-toast-error";
import noDataImage from "../assets/nothing here yet.webp"
import { useLocation } from "react-router-dom";
import CardLoading from "../component/cardLoading";
import CardProduct from "../component/cardProduct";
import InfiniteScroll from 'react-infinite-scroll-component'
import useDebounce from '../hooks/useDebounce'

export function SearchPage(){
    const [data,setData]=React.useState([])
    const [loading,setLoading]=useState(true)
    const [page,setPage]=useState(1)
    const [totalPage,setTotalPage] = useState(1)
    const loadingArrayCard = new Array(10).fill(null)
  const location = useLocation();
  // parse query string reliably (supports ?q=term or ?search=term)
  const queryParams = new URLSearchParams(location.search);
  const searchText = queryParams.get('q') || queryParams.get('search') || '';
  console.log('searchText in search page', searchText)
  const debouncedSearch = useDebounce(searchText, 500)

    const fetchData = async() => {
    try {
      setLoading(true)
      console.log("fetching data for searchText:",debouncedSearch," page:",page)
        const response = await Axios({
            ...Api_endpoints.searchProduct,
            data : {
              search : debouncedSearch,
              page : page,
            }
        })

        const { data : responseData } = response

        if(responseData.success){
            if(page === 1){
              setData(responseData.data || [])
            } else {
              setData((preve)=>[
                  ...preve,
                  ...(responseData.data || [])
              ])
            }
            setTotalPage(responseData.totalPage || 1)
            console.log(responseData)
        }
    } catch (error) {
        console.log("Error fetching search data:", error);
        AxiosToastError(error)
    }finally{
      setLoading(false)
    }
  }

  useEffect(() => {
    setPage(1)
    setData([])
    setTotalPage(1)
  }, [debouncedSearch])

  useEffect(()=>{
    fetchData()
  },[page, debouncedSearch])

  const hundleLoadMore = ()=>{
    if(page < totalPage){
      setPage((preve)=> preve + 1)
    }
  }


    return(
       <section className="bg-white">
           <div className="container mx-auto p-4">
            <p className="">Search Results: {data.length}</p>

            <InfiniteScroll 
              dataLength={data.length}
              hasMore ={page < totalPage}
              next= {hundleLoadMore}
            >

            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 py-4 gap-4'>
                {
                    data.map((item,index)=>{
                        return(
                            <CardProduct data={item} key={item?._id+"searchProduct"+index} />
                        )
                    })
                }

                {
                    loading && (
                        loadingArrayCard.map((_,index)=>{
                            return(
                                <CardLoading key={"loadingsearchpage"+index}/>
                            )
                        })
                    )
                }

            </div>
            </InfiniteScroll>

            {
                //no data 
                !data[0] && !loading && (
                  <div className='flex flex-col justify-center items-center w-full mx-auto'>
                    <img
                      src={noDataImage} 
                      className='w-full h-full max-w-xs max-h-xs block'
                    />
                    <p className='font-semibold my-2'>No Data found</p>
                  </div>
                )
              }

           </div>
       </section>
    )
}