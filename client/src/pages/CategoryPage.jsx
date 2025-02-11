import { useEffect, useState } from 'react'
import UploadCategoryModel from '../components/UploadCategoryModel'
import Loading from '../components/Loading'
import NoData from '../components/NoData'
import Axios from '../utils/Axios'
import summaryApi from '../common/summaryApi'
import EditCategory from '../components/EditCategory'
import CofirmBox from '../components/CofirmBox'
import toast from 'react-hot-toast'
import AxiosToastError from '../utils/AxiosToastError'


const CategoryPage = () => {

    // upload category
    const [openUploadCategory,setOpenUploadCategory] = useState(false)
    const [loading,setLoading] = useState(false)

    // value init category
    const [categoryData,setCategoryData] = useState([])
    
    // edit category
    const [openEdit,setOpenEdit] = useState(false)
    const [editData,setEditData] = useState({
        name : "",
        image : "",
        
    })

    // delete category
    const [openConfimBoxDelete,setOpenConfirmBoxDelete] = useState(false)
    const [deleteCategory,setDeleteCategory] = useState({
        _id : ""
    })
   
    
    const fetchCategory = async()=>{
        try {
          setLoading(true)
          const response = await Axios({
            ...summaryApi.getCategory
          })
          const { data : responseData } = response

          if(responseData.success){
            setCategoryData(responseData.data)
            
          }
        } catch (error) {
          AxiosToastError(error)
        }finally{
          setLoading(false)
        }
    }

    useEffect(()=>{
        fetchCategory()
    },[])

    const handleDeleteCategory = async()=>{
        try {
            const response = await Axios({
                ...summaryApi.deleteCategory,
                data : deleteCategory
            })

            const { data : responseData } = response

            if(responseData.success){
                toast.success(responseData.message)
                fetchCategory()
                setOpenConfirmBoxDelete(false)
            }
        } catch (error) {
            AxiosToastError(error)
        }
    }

  return (
    <div className=''>
        <div className='p-2   bg-white shadow-md flex items-center justify-between'>
            <h2 className='font-semibold'>Category</h2>
            <button onClick={()=>setOpenUploadCategory(true)} className='text-sm border border-yellow-400 hover:bg-yellow-400 hover:text-white px-3 py-1 rounded'>Add Category</button>
        </div>
        {
            !categoryData[0] && !loading && (
                <NoData/>
            )
        }

        <div className='mt-5 ml-5 grid  grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 place-items-center'>
            {
                categoryData.map((category)=>{
                    return(
                        <div className='w-40 h-56 rounded shadow-md flex flex-col items-center justify-center' key={category._id}>
                            <img 
                                
                              src={category.image}
                              className='w-full object-scale-down h-28 shadow-sm '
                            />
                            <p className='my-3 truncate 
                             capitalize font-semibold text-sm'>{category.name}</p>
                            <div className='items-center h-9 flex gap-3'>
                                <button onClick={()=>{
                                    setOpenEdit(true)
                                    setEditData(category)
                                }} className='flex-1 border border-green-600 hover:bg-green-600  
                                font-medium py-1 px-3 rounded text-green-600 hover:text-white'>
                                    Edit
                                </button>
                                <button onClick={()=>{
                                    setOpenConfirmBoxDelete(true)
                                    setDeleteCategory(category)
                                }} className='flex-1 px-1 py-1 border border-red-600 
                                  rounded text-red-600 hover:text-white hover:bg-red-600'>
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
            openUploadCategory && (
              <UploadCategoryModel fetchData={fetchCategory} close={()=>setOpenUploadCategory(false)}/>
            )
        }

        {
            openEdit && (
              <EditCategory data={editData} close={()=>setOpenEdit(false)} fetchData={fetchCategory}/>
            )
        }

        {
          openConfimBoxDelete && (
          <CofirmBox close={()=>setOpenConfirmBoxDelete(false)} 
          cancel={()=>setOpenConfirmBoxDelete(false)} confirm={handleDeleteCategory}/>
           ) 
        }
    </div>
  )
}

export default CategoryPage