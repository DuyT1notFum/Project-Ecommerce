



import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Axios from '../utils/Axios'
import summaryApi from '../common/summaryApi'
import { logout } from '../store/userSlice'
import toast from 'react-hot-toast'
import AxiosToastError from '../utils/AxiosToastError'
import { HiOutlineExternalLink } from "react-icons/hi";
import isAdmin from '../utils/isAdmin'




const UserMenu = ({close}) => {
    const user = useSelector((state)=> state.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()
 
    const handleLogout = async()=>{
         try {
           const response = await Axios({
              ...summaryApi.logout
           })
           console.log("logout",response)
           if(response.data.success){
             if(close){
               close()
             }
             dispatch(logout())
             localStorage.clear()
             toast.success(response.data.message)
             navigate("/")
           }
         } catch (error) {
           console.log(error)
           AxiosToastError(error)
         }
    }
 
    const handleClose = ()=>{
       if(close){
         close()
       }
    }

    const isActive = (path) => location.pathname === path;
   return (
     <div>
         <div className='font-semibold text-center'>My Account</div>
         <div className='text-sm flex justify-center items-center gap-2'>
           <span className='max-w-52 text-ellipsis line-clamp-1 font-semibold'>{user.name || user.mobile} <span className='text-medium  text-red-600'>{user.role === "ADMIN" ? "(Admin)" : "" }</span></span>
           <Link onClick={handleClose} to={"/dashboard/profile"} className=' hover:text-yellow-500'>
             <HiOutlineExternalLink size={15}/>
           </Link>
         </div>
 
         <hr className='p-[0.5px] bg-slate-100 my-2' />
 
         <div className='text-sm grid gap-1 place-items-center '>
            <div className='flex flex-col items-center w-full '>
                  {
                    isAdmin(user.role) && (
                      <Link onClick={handleClose} to={"/dashboard/category"}
                        className={`w-full shadow-md p-1 text-center rounded-md ${
                        isActive("/dashboard/category") ? "bg-green-400 text-white"
                        : "hover:bg-green-400 hover:text-white"}
                        `} 
                      >Category</Link>
                    )
                  }
      
                  {
                    isAdmin(user.role) && (
                      <Link onClick={handleClose} to={"/dashboard/subcategory"} 
                      className={`w-full shadow-md p-1 text-center rounded-md ${
                        isActive("/dashboard/subcategory") ? "bg-green-400 text-white" 
                        : "hover:bg-green-400 hover:text-white"
                      }`}
                      >Sub Category</Link>
                    )
                  }
      
                  {
                    isAdmin(user.role) && (
                      <Link onClick={handleClose} to={"/dashboard/upload-product"} 
                      className={`w-full shadow-md p-1 text-center rounded-md ${
                      isActive("/dashboard/upload-product") ? "bg-green-400 text-white" 
                      : "hover:bg-green-400 hover:text-white"
                      }`}
                      >Upload Product</Link>
                    )
                  }
      
                  {
                    isAdmin(user.role) && (
                      <Link onClick={handleClose} to={"/dashboard/product"} 
                      className={`w-full shadow-md p-1 text-center rounded-md ${
                        isActive("/dashboard/product") ? "bg-green-400 text-white" 
                        : "hover:bg-green-400 hover:text-white"
                      }`}
                      >Product</Link>

                    )
                  }
            </div>
             <Link onClick={handleClose} to={"/dashboard/myorders"} 
              className={`w-full shadow-md p-1 text-center rounded-md ${
                isActive("/dashboard/myorders") ? "bg-green-400 text-white" 
                : "hover:bg-green-400 hover:text-white"
              }`}
             > My Order</Link>

             <Link onClick={handleClose} to={"/dashboard/address"} 
              className={`w-full shadow-md p-1 text-center rounded-md ${
                isActive("/dashboard/address") ? "bg-green-400 text-white" 
                : "hover:bg-green-400 hover:text-white"
              }`}
             >My Address</Link>
             
             <button onClick={handleLogout} className='w-full shadow-md p-1
             hover:bg-green-400 hover:text-white rounded-md'>
              Logout</button>
 
         </div>
     </div>
   )
 }


 export default UserMenu