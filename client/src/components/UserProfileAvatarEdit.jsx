

import { FaRegUserCircle } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import Axios from '../utils/Axios'
import summaryApi from '../common/summaryApi'
import AxiosToastError from '../utils/AxiosToastError'
import { updatedAvatar } from '../store/userSlice'
import { IoClose } from "react-icons/io5";
import { useState } from 'react'
import PropTypes from 'prop-types'

const UserProfileAvatarEdit = ({close}) => {
    const user = useSelector(state => state.user)
    const dispatch = useDispatch()
    const [loading,setLoading] = useState(false)

    const handleSubmit = (e)=>{
        e.preventDefault()
    }

    const handleUploadAvatarImage = async(e)=>{
        const file = e.target.files[0]

        if(!file){
            return
        }

        const formData = new FormData()
        formData.append('avatar',file)

        try {
            setLoading(true)
            const response = await Axios({
                ...summaryApi.uploadAvatar,
                data : formData
            })
            const { data : responseData}  = response

            dispatch(updatedAvatar(responseData.data.avatar))

        } catch (error) {
            AxiosToastError(error)
        } finally{
            setLoading(false)
        }

    }
  return (
    <section className='fixed z-50 top-0 bottom-0 left-0 right-0 bg-neutral-900 bg-opacity-60 p-4 flex items-center justify-center'>
        <div className='bg-white max-w-sm w-full rounded p-4 flex flex-col items-center justify-center'>
            <button onClick={close} className='text-neutral-800 w-fit block ml-auto bg-ray-100 rounded-full hover:bg-gray-300 shadow-md'>
                <IoClose size={20}/>
            </button>
            <div className='w-20 h-20 bg-red-500 flex items-center justify-center rounded-full overflow-hidden drop-shadow-sm'>
                {
                    user.avatar ? (
                        <img 
                        alt={user.name}
                        src={user.avatar}
                        className='w-full h-full'
                        />
                    ) : (
                        <FaRegUserCircle size={65}/>
                    )
                }
            </div>
            <form onSubmit={handleSubmit}>
                <label htmlFor='uploadProfile'>
                    <div className='border border-yellow-300 cursor-pointer hover:bg-yellow-300 px-4 py-1 rounded text-sm my-3 shadow-md'>
                        {
                            loading ? "Loading..." : "Upload"
                        }
                    </div>
                    <input onChange={handleUploadAvatarImage} type='file' id='uploadProfile' className='hidden'/>
                </label>
            </form>
            
        </div>
    </section>
  )
}
UserProfileAvatarEdit.propTypes = {
  close: PropTypes.func.isRequired,
};
export default UserProfileAvatarEdit