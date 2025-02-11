

import { useState } from "react"
import { FaRegEyeSlash } from "react-icons/fa6";
import { FaRegEye } from "react-icons/fa6";
import toast from "react-hot-toast";
import Axios from "../utils/Axios";
import summaryApi from "../common/summaryApi";
import { Link, useNavigate } from "react-router-dom";
import AxiosToastError from "../utils/AxiosToastError";
import fetchUserDetails from '../utils/fetchUserDetails';
import { useDispatch } from 'react-redux';
import { setUserDetails } from '../store/userSlice';
import { IoClose } from "react-icons/io5";


const Login = () => {
  const [data,setData] = useState({
    email:"",
    password:"",
  })

  // click icon show and confirm password
  const [showPassword,setShowPassword] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  //close form Login

  const [showLogin,setShowLogin] = useState(true)

  

  // update value data
  const handleChange = (e)=>{
    const {name,value} = e.target
    setData((preve)=>{
      return{
        ...preve,
        [name]:value
      }
    })
  }

  //condition for button active
  const valideValue = Object.values(data).every(el=>el)  

  const handleSubmit = async(e)=>{
    e.preventDefault()

    try {

      const response = await Axios({
        ...summaryApi.login,
        data:data
      })

      if (response.data.error) {
        toast.error(response.data.message)
      }

      if (response.data.success) {
        toast.success(response.data.message)
        localStorage.setItem('accesstoken',response.data.data.accesstoken)
        localStorage.setItem('refreshToken',response.data.data.refreshToken)

        const userDetails = await fetchUserDetails()
        dispatch(setUserDetails(userDetails.data))
        
        setData({
          email:"",
          password:"",  
        })
        navigate("/")
      }

      

    } catch (error) {
    AxiosToastError(error)
    }

  }

  if (!showLogin) {
    return
  }


  return (
    <div className="backdrop-blur-sm fixed top-0 left-0 -right-0 bottom-0 bg-black/20 z-50  ">
      <div className="bg-white mt-28  max-w-sm mx-auto rounded-2xl p-4  shadow-md">

        <p className="ml-[80px] font-bold text-2xl text-gray-700">Login to <span className="text-yellow-400">Binkey<span className="text-green-400">it</span> </span> </p>

        <form className="grid gap-4 mt-6" action="" onSubmit={handleSubmit}>

          
          <div className="grid gap-1">
            <label className="font-medium" htmlFor="email">Email : </label>
            <input 
              id="email"
              type="email"
              className="bg-blue-50 p-2 focus-within:outline-yellow-200 rounded-lg "
              value={data.email}
              name="email"
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="grid gap-1">
            <label className="font-medium" htmlFor="password">Password : </label>
            <div className="bg-blue-50 p-2 border-[2px] flex items-center gap-1 rounded-lg focus-within:border-yellow-200">
              <input 
                id="password"
                type= {showPassword ? "text" : "password"}
                className="w-full bg-transparent outline-none"
                value={data.password}
                name="password"
                onChange={handleChange}
                placeholder="Enter your password"
                required
              />

              <div className="cursor-pointer" onClick={()=>setShowPassword(preve => !preve)}>
                {
                  showPassword ? (
                    <FaRegEye />
                  ) :
                  (
                    <FaRegEyeSlash />
                  )
                }
              </div>
            </div>
            <Link to={"/forgot-password"} className="text-xs underline hover:text-yellow-500 flex justify-end cursor-pointer ">Forgot password ?</Link>
          </div>

          
          <button  className={` ${valideValue ? "bg-green-600" :"bg-gray-500"} text-white py-2 rounded font-semibold my-3 hover:scale-105 transition-all duration-300 hover:bg-green-900  `}>Login</button>

          <div onClick={()=>setShowLogin(false)}  className=" relative flex justify-end mr-3 ">
            <IoClose className="absolute top-[-320px] rounded-full bg-white shadow-md hover:bg-gray-200 " size={20}/>
          </div>
          
        </form>

        <p className="py-2 font-circular-wed">
          Do not have account ? <Link className="text-green-500 underline" to={"/register"}>Register</Link>
        </p>

        
      </div>
    </div>
  )
}



export default Login