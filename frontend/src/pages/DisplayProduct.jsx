import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom"
import { Axios } from "../utils/Axios";
import Api_endpoints from "../common/api-details";
import AxiosToastError from "../utils/Axios-toast-error";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { DisplayPriceInRupees, pricewithDiscount } from "../utils/priceWithDiscount";
// import AddToCartButton from "../components/AddToCartButton";
import image1 from "../assets/minute_delivery.png"
import image2 from "../assets/Best_Prices_Offers.png"
import image3 from "../assets/Wide_Assortment.png"


function ProductDisplayPage() {
    const param = useParams();
    const productId = param.product.split("-").slice(-1)[0]
    const [data, setData] = useState({
        name: "",
        image: []
    });
    const [loading, setLoading] = useState(false);
    const [image,setImage] = useState(0)
    const imageContainer = useRef()


    const fetchProductData = async() => {
        try {
            setLoading(true)
            const response = await Axios({
                ...Api_endpoints.getProductDetails,
                data: {
                    productId: productId
                }
            })
            const { data : responseData } = response;
            console.log("responseData in product display page",responseData)
            if(responseData.success){
                setData(responseData.data)
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

    const handleScrollRight = ()=>{
        // imageContainer.current.scrollLeft += 100
        // update imge index to next image
        if(image < data.image.length - 1){
            setImage(image + 1)
        } else {
            setImage(0)
        }
    }
    const handleScrollLeft = ()=>{
        // imageContainer.current.scrollLeft -= 100
        // update imge index to previous image
        if(image > 0){
            setImage(image - 1)
        } else {
            setImage(data.image.length - 1)
        }
    }    
    console.log("product data in display page",data)
  return (
    <section className="container mx-auto p-4 grid lg:grid-cols-2">
        <div>
            <div className="bg-white lg:min-h-[60vh] lg:max-h-[60vh] min-h-56 max-h-56 w-full h-full rounded">
                <img 
                    src= {data.image[image]}
                    alt={data.name}
                    className="w-full h-full object-scale-down rounded"
                />
            </div>
            <div className="flex items-center justify-center gap-3 my-2 overflow-x-auto">
                {
                    data.image.map((img,index)=>{
                        return (
                            <div key={image+index+"point"} className={`rounded-full bg-red-400 w-3 h-3 lg:w-5 lg:h-5 ${index == image && "bg-blue-500"}`}></div>
                        )
                    })
                }
            </div>

            <div className="grid relative">
                <div ref={imageContainer} className="flex items-center justify-start gap-2 overflow-x-auto p-2">
                    {
                        data.image.map((img,index)=>{
                            return(
                                <div className='w-20 h-20 min-h-20 min-w-20 scr cursor-pointer shadow-md' key={img+index}>
                                    <img 
                                        key={img+index+"thumbnail"} 
                                        src={img} 
                                        alt={data.name} 
                                        className="w-full h-full object-scale-down rounded"
                                        onClick={()=> setImage(index)}
                                    />
                                </div>
                            )
                        })                      
                    }
                </div>

                <div className='w-full -ml-3 h-full hidden lg:flex justify-between absolute  items-center'>
                    <button onClick={handleScrollLeft} className='z-10 bg-white relative p-1 rounded-full shadow-lg'>
                        <FaAngleLeft/>
                    </button>
                    <button onClick={handleScrollRight} className='z-10 bg-white relative p-1 rounded-full shadow-lg'>
                        <FaAngleRight/>
                    </button>
                </div>
            </div>
          
        </div>
           <div className='p-4 lg:pl-7 text-base lg:text-lg'>
            <p className='bg-green-300 w-fit px-2 rounded-full'>10 Min</p>
            <h2 className='text-lg font-semibold lg:text-3xl'>{data.name}</h2>  
            <p className=''>{data.unit}</p> 
            <br/>
            <div>
              <p className=''>Price</p> 
              <div className='flex items-center gap-2 lg:gap-4'>
                <div className='border border-green-600 px-4 py-2 rounded bg-green-50 w-fit'>
                    <p className='font-semibold text-lg lg:text-xl'>{DisplayPriceInRupees(pricewithDiscount(data.price,data.discount))}</p>
                </div>
                {
                  data.discount && (
                    <p className='line-through'>{DisplayPriceInRupees(data.price)}</p>
                  )
                }
                {
                  data.discount && (
                    <p className="font-bold text-green-600 lg:text-2xl">{data.discount}% <span className='text-base text-neutral-500'>Discount</span></p>
                  )
                }
                
              </div>

            </div> 
              
              {
                data.stock === 0 ? (
                  <p className='text-lg text-red-500 my-2'>Out of Stock</p>
                ) 
                : (
                  // <button className='my-4 px-4 py-1 bg-green-600 hover:bg-green-700 text-white rounded'>Add</button>
                  <div className='my-4'>
                    {/* <AddToCartButton data={data}/> */}
                  </div>
                )
              }
           

            <h2 className='font-semibold'>Why shop from binkeyit? </h2>
            <div>
                  <div className='flex  items-center gap-4 my-4'>
                      <img
                        src={image1}
                        alt='superfast delivery'
                        className='w-20 h-20'
                      />
                      <div className='text-sm'>
                        <div className='font-semibold'>Superfast Delivery</div>
                        <p>Get your orer delivered to your doorstep at the earliest from dark stores near you.</p>
                      </div>
                  </div>
                  <div className='flex  items-center gap-4 my-4'>
                      <img
                        src={image2}
                        alt='Best prices offers'
                        className='w-20 h-20'
                      />
                      <div className='text-sm'>
                        <div className='font-semibold'>Best Prices & Offers</div>
                        <p>Best price destination with offers directly from the nanufacturers.</p>
                      </div>
                  </div>
                  <div className='flex  items-center gap-4 my-4'>
                      <img
                        src={image3}
                        alt='Wide Assortment'
                        className='w-20 h-20'
                      />
                      <div className='text-sm'>
                        <div className='font-semibold'>Wide Assortment</div>
                        <p>Choose from 5000+ products across food personal care, household & other categories.</p>
                      </div>
                  </div>
            </div>

            {/****only mobile */}
            <div className='my-4 grid gap-3 '>
                <div>
                    <p className='font-semibold'>Description</p>
                    <p className='text-base'>{data.description}</p>
                </div>
                <div>
                    <p className='font-semibold'>Unit</p>
                    <p className='text-base'>{data.unit}</p>
                </div>
                {
                  data?.more_details && Object.keys(data?.more_details).map((element,index)=>{
                    return(
                      <div>
                          <p className='font-semibold'>{element}</p>
                          <p className='text-base'>{data?.more_details[element]}</p>
                      </div>
                    )
                  })
                }
            </div>
        </div>

    </section>
  )
}

export default ProductDisplayPage