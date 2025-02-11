import { useState } from "react"
import { FaRegEyeSlash } from "react-icons/fa6";
import { FaRegEye } from "react-icons/fa6";
import toast from "react-hot-toast";
import Axios from "../utils/Axios";
import summaryApi from "../common/summaryApi";
import { Link, useNavigate } from "react-router-dom";
import AxiosToastError from '../utils/AxiosToastError';
import { IoClose } from "react-icons/io5";

const Register = () => {

  const [data,setData] = useState({
    name:"",
    email:"",
    password:"",
    confirmPassword:""
  })

  // click icon show and confirm password
  const [showPassword,setShowPassword] = useState(false)
  const [showConfirmPassword,setShowConfirmPassword] = useState(false)

  // close form register
  const [showRegister,setShowRegister] = useState(true)

  
  const navigate = useNavigate()

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
    if (data.password !== data.confirmPassword) {
      toast.error(
        "Password and confirm password must be same"
      )
      return
    }
    
    try {

      const response = await Axios({
        ...summaryApi.register,
        data:data
      })

      if (response.data.error) {
        toast.error(response.data.message)
      }

      if (response.data.success) {
        toast.success(response.data.message)
        setData({
          name:"",
          email:"",
          password:"",
          confirmPassword:""      
        })
        navigate("/login")
      }

      console.log("response",response)

    } catch (error) {
      AxiosToastError(error)
    }

  }
  
  if (!showRegister) {
    return
  }
  


  return (
    <div className="backdrop-blur-sm py-4 fixed top-0 left-0 -right-0 bottom-0 bg-black/20 z-50  ">
      <div className="bg-white my-4  max-w-md mx-auto rounded-2xl p-4 container shadow-md">

        <p className="ml-[100px] font-bold text-2xl text-gray-700">Welcome to <span className="text-yellow-400">Binkey<span className="text-green-400">it</span> </span> </p>

        <form className="grid gap-4 mt-6" action="" onSubmit={handleSubmit}>

          <div className="grid gap-1">
            <label className="font-medium" htmlFor="name">Name : </label>
            <input 
              id="name"
              type="text"
              autoFocus 
              className="bg-blue-50 p-1 focus-within:outline-yellow-200 rounded-lg "
              value={data.name}
              name="name"
              onChange={handleChange}
              placeholder="Enter your name"
              required
            />
          </div>

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
          </div>

          <div className="grid gap-1">
            <label className="font-medium" htmlFor="confirmPassword">Confirm Password : </label>
            <div className="bg-blue-50 p-2 border-[2px] flex items-center gap-1 rounded-lg focus-within:border-yellow-200">
              <input 
                id="confirmPassword"
                type= {showConfirmPassword ? "text" : "password"}
                className="w-full bg-transparent outline-none"
                value={data.confirmPassword}
                name="confirmPassword"
                onChange={handleChange}
                placeholder="Enter your confirm password"
                required
              />

              <div className="cursor-pointer" onClick={()=>setShowConfirmPassword(preve => !preve)}>
                {
                  showConfirmPassword ? (
                    <FaRegEye />
                  ) :
                  (
                    <FaRegEyeSlash />
                  )
                }
              </div>
            </div>
          </div>

          <button  className={` ${valideValue ? "bg-green-600" :"bg-gray-500"} text-white py-2 rounded font-semibold my-3 hover:scale-105 transition-all duration-300 hover:bg-green-900  `}>Register</button>

          <div onClick={()=>setShowRegister(false)} className=" relative flex justify-end mr-3 ">
            <IoClose className="absolute top-[-465px] rounded-full bg-white shadow-md hover:bg-gray-200 " size={20}/>
          </div>
          
        </form>

        <p className="py-2 font-circular-wed">
          Already have account ? <Link className="text-green-500 underline" to={"/login"}>Login</Link>
        </p>
        
       
      </div>
    </div>
  )
}

export default Register