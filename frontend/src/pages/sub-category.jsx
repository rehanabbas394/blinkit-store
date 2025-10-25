import React, { useEffect, useState } from 'react'
import UploadSubCategoryModel from '../component/uploadSubCategory';
import { Axios } from '../utils/Axios'
import AxiosToastError from '../utils/Axios-toast-error'
import { createColumnHelper } from '@tanstack/react-table'
// import ViewImage from '../components/ViewImage'
import { LuPencil } from "react-icons/lu";
import { MdDelete  } from "react-icons/md";
import { HiPencil } from "react-icons/hi";
// import EditSubCategory from '../components/EditSubCategory'
// import CofirmBox from '../components/CofirmBox'
import toast from 'react-hot-toast'
import Api_endpoints from '../common/api-details'
import DisplayTable from '../component/displayTable';
import ViewImage from '../component/viewImage';
import EditSubCategoryModel from '../component/editSubCategory';
import CofirmBox from '../component/confirmBox';

const SubCategory = () => {
  const [openAddSubCategory,setOpenAddSubCategory] = useState(false)
  const [data,setData] = useState([])
  const [loading,setLoading] = useState(false)
  const columnHelper = createColumnHelper()
  const [ImageURL,setImageURL] = useState("")
  const [openEdit,setOpenEdit] = useState(false)
  const [editData,setEditData] = useState({
    _id : ""
  })
  const [deleteSubCategory,setDeleteSubCategory] = useState({
      _id : ""
  })
  const [openDeleteConfirmBox,setOpenDeleteConfirmBox] = useState(false)


  const fetchSubCategory = async()=>{
    try {
        setLoading(true)
        const response = await Axios({
          ...Api_endpoints.getSubCategory
        })
        const { data : responseData } = response

        if(responseData.success){
          setData(responseData.data)
        }
    } catch (error) {
       AxiosToastError(error)
    } finally{
      setLoading(false)
    }
  }

  const handleDeleteSubCategory = async()=>{
    try {
      const response = await Axios({
        ...Api_endpoints.deleteSubCategory,
        data : {
          _id : deleteSubCategory._id
        }
      })

      const { data : responseData } = response

      if(responseData.success){
        toast.success("Sub Category deleted successfully")
        fetchSubCategory()
        setOpenDeleteConfirmBox(false)
        setDeleteSubCategory({_id : ""})
      }
      
    } catch (error) {
      AxiosToastError(error)
    }
  }

  useEffect(()=>{
    fetchSubCategory()
  },[])

  const column = [
    columnHelper.accessor('name',{
      header: 'Name',
    }),
    columnHelper.accessor('image',{
      header: 'Image',
      cell: (row)=>{
        return (
          <div className='flex items-center justify-center'>
            <img 
              src={row.row.original.image}
              alt={row.row.original.name} 
              className='w-8 h-8 cursor-pointer'
              onClick={()=>{setImageURL(row.row.original.image)}}
            />
          </div>
        )
      }
    }),
    columnHelper.accessor('category',{
      header: 'Category',
      cell: (row)=>{
        return (
           <>
            {
              row.row.original.category.map((c,index)=>{
                return(
                  <p key={c._id+"table"} className='shadow-md px-1 inline-block'>{c.name}</p>
                )
              })
            }
          </>
        )
      }
    }),
    columnHelper.accessor('_id',{
      header: 'Actions',
      cell: (row)=>{
        return(
          <div className='flex items-center justify-center gap-3'>
            <button
              onClick={()=>{
                setEditData(row.row.original)
                setOpenEdit(true)
              }}
              >
              <HiPencil size={20} className='text-blue-500 hover:text-black-600'/>
            </button>
            <button
              onClick={()=>{
                setDeleteSubCategory(row.row.original)
                setOpenDeleteConfirmBox(true)
              }}
              >
              <MdDelete size={20} className='text-red-500 hover:text-red-600'/>
            </button>
          </div>

        )
      }
    }),
  ]

  return (
    <section className=''>
        <div className='p-2   bg-white shadow-md flex items-center justify-between'>
            <h2 className='font-semibold'>Sub Category</h2>
            <button onClick={()=>setOpenAddSubCategory(true)} className='text-sm border border-primary-200 hover:bg-primary-200 px-3 py-1 rounded'>Add Sub Category</button>
        </div>

        <div className='overflow-auto w-full max-w-[95vw]'>
            <DisplayTable
                data={data}
                column={column}
            />
        </div>

        {
          ImageURL && (
          <ViewImage url={ImageURL} close={()=> setImageURL("")}/>
          )
        }

        {
          openEdit && (
            <EditSubCategoryModel 
              close={()=>setOpenEdit(false)}
              data={editData}
              fetchData={fetchSubCategory}
            />
          )
        }

        {
          openAddSubCategory && (
            <UploadSubCategoryModel 
              close={()=>setOpenAddSubCategory(false)}
              fetchData={fetchSubCategory}
            />
          )
        }

        {
          openDeleteConfirmBox && (
            <CofirmBox
            cancel = {()=>setOpenDeleteConfirmBox(false)}
            close = {()=>setOpenDeleteConfirmBox(false)}
            confirm = {handleDeleteSubCategory}
            />
          )
        }
       
    </section>
  )
}

export default SubCategory
