

import { useEffect, useState } from 'react'
import UploadSubCategoryModel from '../components/UploadSubCategoryModel'
import AxiosToastError from '../utils/AxiosToastError'
import Axios from '../utils/Axios'
import summaryApi from '../common/summaryApi'
import DisplayTable from '../components/DisplayTable'
import { createColumnHelper } from '@tanstack/react-table'
import ViewImage from '../components/ViewImage'
import { MdDelete  } from "react-icons/md";
import { HiPencil } from "react-icons/hi";
import EditSubCategory from '../components/EditSubCategory'
import CofirmBox from '../components/CofirmBox'
import toast from 'react-hot-toast'
import Loading from '../components/Loading'
import NoData from '../components/NoData'

const SubCategoryPage = () => {

  //  open subcategory
  const [openAddSubCategory,setOpenAddSubCategory] = useState(false)

  // value init subcategory
  const [data,setData] = useState([])


  // loading for subcategory and animate
  const [loading,setLoading] = useState(false)
  
  // collum of tanstack react-table
  const columnHelper = createColumnHelper()

  // url of image
  const [ImageURL,setImageURL] = useState("")

  // open edit subcategory
  const [openEdit,setOpenEdit] = useState(false)
  const [editData,setEditData] = useState({
    _id : ""
  })

  // delete subcategory
  const [deleteSubCategory,setDeleteSubCategory] = useState({
      _id : ""
  })
  const [openDeleteConfirmBox,setOpenDeleteConfirmBox] = useState(false)

  // get value subcategory
  const fetchSubCategory = async()=>{
    try {
        setLoading(true)
        const response = await Axios({
          ...summaryApi.getSubCategory
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

  // call api
  useEffect(()=>{
    fetchSubCategory()
  },[])
  
  //  create column value name,image,category,action
  const column = [
    columnHelper.accessor('name',{
      header : "Name",
      cell:({row})=>{
        
        return (
          <div className='flex justify-center  items-center'>
            {
              row.original.name
            }
          </div>
        )
      }
    }),
    columnHelper.accessor('image',{
      header : "Image",
      cell : ({row})=>{
        
        return <div className='flex justify-center items-center'>
            <img 
                src={row.original.image}
                alt={row.original.name}
                className='w-8 h-8 cursor-pointer'
                onClick={()=>{
                  setImageURL(row.original.image)
                }}      
            />
        </div>
      }
    }),
    columnHelper.accessor("category",{
       header : "Category",
       cell : ({row})=>{
        return(
          <>
            {
              row.original.category.map((c)=>{
                return(
                  <p key={c._id+"table"} className=' flex justify-center'>{c.name}</p>
                )
              })
            }
          </>
        )
       }
    }),
    columnHelper.accessor("_id",{
      header : "Action",
      cell : ({row})=>{
        return(
          <div className='flex items-center justify-center gap-3'>
              <button onClick={()=>{
                  setOpenEdit(true)
                  setEditData(row.original)
              }} className='p-2 border-green-500 border rounded-full
               hover:text-white hover:bg-green-500 text-green-500 shadow-md '>
                  <HiPencil size={20}/>
              </button>
              <button onClick={()=>{
                setOpenDeleteConfirmBox(true)
                setDeleteSubCategory(row.original)
              }} className='p-2 border-red-500 border rounded-full
               hover:text-white hover:bg-red-500 text-red-500 shadow-md'>
                  <MdDelete  size={20}/>
              </button>
          </div>
        )
      }
    })
  ]

  // delete subcategory
  const handleDeleteSubCategory = async()=>{
      try {
          const response = await Axios({
              ...summaryApi.deleteSubCategory,
              data : deleteSubCategory
          })

          const { data : responseData } = response

          if(responseData.success){
             toast.success(responseData.message)
             fetchSubCategory()
             setOpenDeleteConfirmBox(false)
             setDeleteSubCategory({_id : ""})
          }
      } catch (error) {
        AxiosToastError(error)
      }
  }
  return (
    <section className=''>
        <div className='p-2   bg-white shadow-md flex items-center justify-between'>
            <h2 className='font-semibold'>Sub Category</h2>
            <button onClick={()=>setOpenAddSubCategory(true)} 
            className='text-sm border border-yellow-400 hover:bg-yellow-400 
            px-3 py-1 rounded-md text-yellow-500 hover:text-gray-700
            '>Add Sub Category</button>
        </div>

        
        <div className='overflow-auto w-full max-w-[95vw]'>
            <DisplayTable
                data={data}
                column={column}
            />
        </div>

        {
          !data[0] && !loading && (
            <NoData/>
          )
        }
        
        {
          loading && (
            <div className='mt-40'>
              <Loading/>
            </div>
            
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
          ImageURL &&
          <ViewImage url={ImageURL} close={()=>setImageURL("")}/>
        }

        {
          openEdit && 
          <EditSubCategory 
            data={editData} 
            close={()=>setOpenEdit(false)}
            fetchData={fetchSubCategory}
          />
        }

        {
          openDeleteConfirmBox && (
            <CofirmBox 
              cancel={()=>setOpenDeleteConfirmBox(false)}
              close={()=>setOpenDeleteConfirmBox(false)}
              confirm={handleDeleteSubCategory}
            />
          )
        }
    </section>
  )
}

export default SubCategoryPage