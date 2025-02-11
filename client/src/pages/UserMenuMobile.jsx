import UserMenu from "../components/UserMenu"
import { IoClose } from "react-icons/io5";


const UserMenuMobile = () => {
  return (
    <div className='bg-white h-full '>
        <div className="sm:w-44 md:w-44 max-sm:w-44 absolute top-25 right-12 bg-white z-50 rounded-md shadow-md">
           <button onClick={()=>window.history.back()} className='absolute top-1 right-2 text-neutral-800 block  ml-auto rounded-full shadow-md hover:bg-gray-200'>
              <IoClose size={20}/>
            </button>
            <div className='sm:w-32 md:w-32 max-sm:w-32 mx-auto px-3 pb-4'>
              <UserMenu/>
            </div> 
        </div>
        
    </div>
  )
}

export default UserMenuMobile